#!/usr/bin/env python3
"""Insert or rename numbered topic directories safely.

Examples:
    python topic_manager.py -i 6 "Any topic"
    python topic_manager.py -r "6. Files" "File Handling"
    python topic_manager.py -r 7 "Regular Expressions"
    python topic_manager.py -i 6 "Any topic" --dry-run
    python topic_manager.py -i 6 "Any topic" -d /path/to/topics -y

Only directories whose names begin with a number, a separator, and a title
(e.g. ``1, Basics`` or ``2. Numbers``) are considered numbered topics.
"""

from __future__ import annotations

import argparse
import re
import sys
import uuid
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

# Accept styles such as "1, Basics", "2. Numbers", "10 - Patterns", and
# "3 Strings". The separator is retained when an existing directory is renamed.
NUMBERED_DIR_RE = re.compile(
    r"^(?P<number>\d+)(?P<separator>[\s.,_-]+)(?P<title>.+?)\s*$"
)


@dataclass(frozen=True)
class TopicDir:
    path: Path
    number: int
    separator: str
    title: str


def parse_topic_dir(path: Path) -> TopicDir | None:
    """Return topic metadata if *path* is a numbered directory; else None."""
    if path.is_symlink() or not path.is_dir():
        return None
    match = NUMBERED_DIR_RE.match(path.name)
    if not match:
        return None
    title = match.group("title").strip()
    if not title:
        return None
    return TopicDir(
        path=path,
        number=int(match.group("number")),
        separator=match.group("separator"),
        title=title,
    )


def scan_topics(directory: Path) -> list[TopicDir]:
    """Find numbered topic directories, sorted by number then folder name."""
    topics = [
        topic
        for child in directory.iterdir()
        if (topic := parse_topic_dir(child)) is not None
    ]
    return sorted(topics, key=lambda item: (item.number, item.path.name.casefold()))


def validate_title(value: str) -> str:
    title = value.strip()
    if not title:
        raise ValueError("The topic name cannot be empty.")
    if title in {".", ".."}:
        raise ValueError("The topic name cannot be '.' or '..'.")
    if any(char in title for char in ("/", "\\", "\0")):
        raise ValueError("The topic name cannot contain '/', '\\', or a NUL character.")
    return title


def choose_rename_target(target: str, topics: list[TopicDir]) -> TopicDir:
    """Resolve -r TARGET, where TARGET is a number or exact folder name."""
    if target.isdecimal():
        number = int(target)
        matches = [topic for topic in topics if topic.number == number]
        if not matches:
            raise ValueError(f"No numbered topic folder has number {number}.")
        if len(matches) > 1:
            names = "\n".join(f"  {topic.path.name}" for topic in matches)
            raise ValueError(
                f"Number {number} is ambiguous because multiple folders use it.\n"
                f"Use the exact folder name instead:\n{names}"
            )
        return matches[0]

    matches = [topic for topic in topics if topic.path.name == target]
    if not matches:
        raise ValueError(
            f"No numbered topic folder named {target!r} was found. "
            "Use its exact folder name or its unique number."
        )
    return matches[0]


def build_renumber_plan(
    topics: list[TopicDir],
    start_number: int,
    *,
    mode: str,
    rename_target: TopicDir | None = None,
    new_title: str | None = None,
) -> dict[Path, Path]:
    """Create old-path -> desired-path mapping for topics at/after a number.

    Insert mode shifts each affected topic up by one. Duplicate numbers are
    resolved by assigning distinct increasing numbers in sorted order.

    Rename mode keeps the selected topic at its current number, then fixes any
    duplicate-number collisions after it. Existing gaps are otherwise kept.
    """
    affected = [topic for topic in topics if topic.number >= start_number]
    if mode == "rename" and rename_target is not None:
        # Keep the selected directory first among same-number folders so it
        # retains its number; remaining duplicates move after it.
        affected.sort(
            key=lambda item: (
                item.number,
                0 if item.path == rename_target.path else 1,
                item.path.name.casefold(),
            )
        )

    last_assigned = start_number if mode == "insert" else start_number - 1
    plan: dict[Path, Path] = {}

    for topic in affected:
        if mode == "insert":
            candidate = topic.number + 1
            title = topic.title
        elif mode == "rename":
            candidate = topic.number
            title = (
                new_title
                if rename_target is not None and topic.path == rename_target.path
                else topic.title
            )
        else:  # Defensive guard for internal callers.
            raise ValueError(f"Unknown planning mode: {mode}")

        assigned_number = max(candidate, last_assigned + 1)
        last_assigned = assigned_number
        new_name = f"{assigned_number}{topic.separator}{title}"
        plan[topic.path] = topic.path.with_name(new_name)

    return plan


def check_plan(
    directory: Path,
    plan: dict[Path, Path],
    *,
    new_directory: Path | None = None,
) -> None:
    """Reject duplicate final names and collisions with untouched entries."""
    original_names = {source.name for source in plan}
    final_names = [destination.name for destination in plan.values()]
    if new_directory is not None:
        final_names.append(new_directory.name)

    if len(final_names) != len(set(final_names)):
        duplicates = sorted(
            {name for name in final_names if final_names.count(name) > 1},
            key=str.casefold,
        )
        raise ValueError(
            "The planned operation would create duplicate names: "
            + ", ".join(repr(name) for name in duplicates)
        )

    untouched_names = {
        entry.name for entry in directory.iterdir() if entry.name not in original_names
    }
    collisions = sorted(set(final_names) & untouched_names, key=str.casefold)
    if collisions:
        raise ValueError(
            "These target names already exist and are not part of the renumbering "
            "plan: " + ", ".join(repr(name) for name in collisions)
        )


def print_plan(plan: dict[Path, Path], new_directory: Path | None = None) -> bool:
    """Print planned changes; return True if at least one change is needed."""
    changes = [(source, destination) for source, destination in plan.items()
               if source.name != destination.name]
    if changes:
        print("Planned directory renames:")
        for source, destination in changes:
            print(f"  {source.name}  ->  {destination.name}")
    if new_directory is not None:
        print(f"Planned new directory: {new_directory.name}/")
    if not changes and new_directory is None:
        print("No changes are needed.")
    return bool(changes or new_directory is not None)


def apply_plan(
    plan: dict[Path, Path],
    *,
    create_directory: Path | None = None,
) -> None:
    """Apply renames via temporary names, attempting rollback on any failure."""
    changes = {
        source: destination
        for source, destination in plan.items()
        if source.name != destination.name
    }
    if not changes and create_directory is None:
        return

    # Temporary names are siblings, so rename operations stay on the same filesystem.
    staged: dict[Path, Path] = {}
    completed: dict[Path, Path] = {}
    created = False

    try:
        for source in changes:
            temporary = source.with_name(f".topic-manager-tmp-{uuid.uuid4().hex}")
            source.rename(temporary)
            staged[source] = temporary

        for source, destination in changes.items():
            staged[source].rename(destination)
            completed[source] = destination

        if create_directory is not None:
            create_directory.mkdir()
            created = True

    except Exception as exc:
        rollback_errors: list[str] = []

        # Move completed destinations back to their temporary staging paths first.
        for source, destination in reversed(list(completed.items())):
            temporary = staged[source]
            try:
                if destination.exists() and not temporary.exists():
                    destination.rename(temporary)
            except OSError as rollback_exc:
                rollback_errors.append(
                    f"could not stage {destination.name!r} for rollback: {rollback_exc}"
                )

        # Restore all staged directories to their original names.
        for source, temporary in reversed(list(staged.items())):
            try:
                if temporary.exists() and not source.exists():
                    temporary.rename(source)
            except OSError as rollback_exc:
                rollback_errors.append(
                    f"could not restore {source.name!r}: {rollback_exc}"
                )

        if created and create_directory is not None:
            try:
                create_directory.rmdir()
            except OSError as rollback_exc:
                rollback_errors.append(
                    f"could not remove new directory {create_directory.name!r}: {rollback_exc}"
                )

        detail = f"Operation failed: {exc}"
        if rollback_errors:
            detail += "\nRollback was incomplete:\n  " + "\n  ".join(rollback_errors)
        raise RuntimeError(detail) from exc


def parse_args(argv: Iterable[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Safely insert or rename numbered topic directories."
    )
    actions = parser.add_mutually_exclusive_group(required=True)
    actions.add_argument(
        "-i", "--insert", nargs=2, metavar=("NUMBER", "TOPIC"),
        help='insert a new topic at NUMBER, e.g. -i 6 "Any topic"',
    )
    actions.add_argument(
        "-r", "--rename", nargs=2, metavar=("TARGET", "NEW_TOPIC"),
        help='rename a topic by unique number or exact folder name, e.g. -r "6. Files" "File Handling"',
    )
    parser.add_argument(
        "-d", "--directory", type=Path, default=Path.cwd(),
        help="directory to operate on (default: current directory)",
    )
    parser.add_argument(
        "-y", "--yes", action="store_true",
        help="apply changes without asking for confirmation",
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="show the plan without changing anything",
    )
    return parser.parse_args(argv)


def main(argv: Iterable[str] | None = None) -> int:
    args = parse_args(argv)
    directory = args.directory.expanduser().resolve()

    if not directory.exists() or not directory.is_dir():
        print(f"Error: not a directory: {directory}", file=sys.stderr)
        return 2

    try:
        topics = scan_topics(directory)

        if args.insert is not None:
            raw_number, raw_title = args.insert
            try:
                number = int(raw_number)
            except ValueError as exc:
                raise ValueError("The insert number must be a positive integer.") from exc
            if number < 1:
                raise ValueError("The insert number must be at least 1.")
            title = validate_title(raw_title)
            new_directory = directory / f"{number}. {title}"
            plan = build_renumber_plan(topics, number, mode="insert")
            check_plan(directory, plan, new_directory=new_directory)
        else:
            raw_target, raw_title = args.rename
            title = validate_title(raw_title)
            target = choose_rename_target(raw_target, topics)
            plan = build_renumber_plan(
                topics,
                target.number,
                mode="rename",
                rename_target=target,
                new_title=title,
            )
            check_plan(directory, plan)
            new_directory = None

        has_changes = print_plan(plan, new_directory)
        if not has_changes:
            return 0
        if args.dry_run:
            print("Dry run: no changes made.")
            return 0

        if not args.yes:
            try:
                answer = input("Apply these changes? [y/N] ").strip().casefold()
            except (EOFError, KeyboardInterrupt):
                print("\nCancelled; no changes made.")
                return 1
            if answer not in {"y", "yes"}:
                print("Cancelled; no changes made.")
                return 1

        apply_plan(plan, create_directory=new_directory)
        print("Done.")
        return 0

    except (OSError, ValueError, RuntimeError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
