"""
multimedia.py — inspect and perform basic operations on image, audio, and video files.

Install Python extras:
    python -m pip install pillow mutagen soundfile

Install FFmpeg separately (provides ffmpeg and ffprobe), e.g. on Ubuntu:
    sudo apt install ffmpeg

Run:
    python multimedia.py
    python multimedia.py "/path/to/media.mp4"
"""

from pathlib import Path
import json
import shutil
import subprocess
import sys


IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".tif", ".tiff"}
AUDIO_EXTENSIONS = {".wav", ".flac", ".ogg", ".oga", ".mp3", ".m4a", ".aac", ".wma", ".aiff", ".aif", ".opus"}
VIDEO_EXTENSIONS = {".mp4", ".mkv", ".mov", ".avi", ".webm", ".m4v", ".mpeg", ".mpg", ".3gp", ".ts", ".mts"}


class MediaError(Exception):
    """Raised when a media operation cannot be completed."""


def resolve_path(raw_path: str) -> Path:
    """Expand ~ and resolve relative paths from the current working directory."""
    raw_path = raw_path.strip().strip('"').strip("'")
    if not raw_path:
        raise MediaError("No path was provided.")
    return Path(raw_path).expanduser().resolve()


def require_file(path: Path) -> None:
    if not path.exists():
        raise FileNotFoundError(f"File not found: {path}")
    if not path.is_file():
        raise MediaError(f"Path is not a file: {path}")


def require_new_output(path: Path) -> None:
    if path.exists():
        raise MediaError(f"Output already exists; choose another name: {path}")


def run_tool(command: list[str]) -> subprocess.CompletedProcess:
    """Run external tools without shell interpretation."""
    try:
        return subprocess.run(command, check=True, capture_output=True, text=True)
    except FileNotFoundError as exc:
        raise MediaError(
            f"Required command not found: {command[0]}. Install FFmpeg and ensure "
            "ffmpeg/ffprobe are on PATH."
        ) from exc
    except subprocess.CalledProcessError as exc:
        detail = (exc.stderr or exc.stdout or str(exc)).strip()
        raise MediaError(detail[-3000:]) from exc


def identify_kind(path: Path) -> str:
    ext = path.suffix.lower()
    if ext in IMAGE_EXTENSIONS:
        return "image"
    if ext in AUDIO_EXTENSIONS:
        return "audio"
    if ext in VIDEO_EXTENSIONS:
        return "video"
    return "unknown"


def inspect_image(path: Path) -> None:
    try:
        from PIL import Image, ExifTags
    except ImportError as exc:
        raise MediaError("Install Pillow: python -m pip install pillow") from exc

    with Image.open(path) as image:
        print("\nIMAGE")
        print("Format:", image.format)
        print("Dimensions (width, height):", image.size)
        print("Color mode:", image.mode)
        print("Frames:", getattr(image, "n_frames", 1))
        print("Animated:", getattr(image, "is_animated", False))
        print("Metadata keys:", sorted(image.info.keys()))
        exif = image.getexif()
        if exif:
            print("EXIF:")
            for tag_id, value in list(exif.items())[:30]:
                print(f"  {ExifTags.TAGS.get(tag_id, str(tag_id))}: {value}")


def inspect_audio(path: Path) -> None:
    print("\nAUDIO")
    try:
        import mutagen
        audio = mutagen.File(path)
        if audio is not None:
            info = getattr(audio, "info", None)
            if info is not None:
                for attr in ("length", "bitrate", "sample_rate", "channels"):
                    value = getattr(info, attr, None)
                    if value is not None:
                        print(f"{attr}: {value}")
            tags = getattr(audio, "tags", None)
            if tags:
                print("Tags:")
                for key in list(tags.keys())[:30]:
                    print(f"  {key}: {tags[key]}")
        else:
            print("Mutagen could not identify this audio format.")
    except ImportError:
        print("Optional metadata unavailable. Install: python -m pip install mutagen")

    try:
        import soundfile as sf
        info = sf.info(str(path))
        print("SoundFile format:", info.format)
        print("Subtype:", info.subtype)
        print("Sample rate:", info.samplerate, "Hz")
        print("Channels:", info.channels)
        print("Frames:", info.frames)
        print("Duration:", f"{info.duration:.3f} seconds")
    except ImportError:
        print("Optional sample information unavailable. Install: python -m pip install soundfile")
    except Exception as exc:
        print("SoundFile could not inspect this format:", exc)

    if shutil.which("ffprobe"):
        result = run_tool([
            "ffprobe", "-v", "error",
            "-show_entries", "format=format_name,duration,bit_rate",
            "-of", "json", str(path)
        ])
        print("FFprobe:", json.dumps(json.loads(result.stdout), indent=2))


def inspect_video(path: Path) -> None:
    if not shutil.which("ffprobe"):
        print("\nFFprobe not installed. Install FFmpeg to inspect streams.")
        print("File size:", f"{path.stat().st_size:,} bytes")
        return

    result = run_tool([
        "ffprobe", "-v", "error",
        "-show_entries",
        "format=filename,format_name,duration,size,bit_rate:"
        "stream=index,codec_type,codec_name,width,height,avg_frame_rate,"
        "sample_rate,channels,channel_layout,pix_fmt",
        "-of", "json", str(path)
    ])
    print("\nVIDEO / MEDIA CONTAINER")
    print(json.dumps(json.loads(result.stdout), indent=2, ensure_ascii=False))


def inspect_media(path: Path) -> None:
    require_file(path)
    print("\nFile:", path)
    print("Extension:", path.suffix or "(none)")
    print("Size:", f"{path.stat().st_size:,} bytes")
    kind = identify_kind(path)
    print("Category from extension:", kind)

    if kind == "image":
        inspect_image(path)
    elif kind == "audio":
        inspect_audio(path)
    elif kind == "video":
        inspect_video(path)
    else:
        print("Unknown media extension.")
        if shutil.which("ffprobe"):
            try:
                result = run_tool([
                    "ffprobe", "-v", "error", "-show_format", "-show_streams",
                    "-of", "json", str(path)
                ])
                print(result.stdout)
            except MediaError as exc:
                print("FFprobe could not identify it:", exc)


def convert_image(path: Path) -> None:
    try:
        from PIL import Image
    except ImportError as exc:
        raise MediaError("Install Pillow: python -m pip install pillow") from exc

    output = resolve_path(input("Output image path (include extension): "))
    require_new_output(output)

    with Image.open(path) as image:
        if output.suffix.lower() in {".jpg", ".jpeg"} and image.mode not in {"RGB", "L"}:
            image = image.convert("RGB")
        image.save(output)
    print("Saved image:", output)


def resize_image(path: Path) -> None:
    try:
        from PIL import Image
    except ImportError as exc:
        raise MediaError("Install Pillow: python -m pip install pillow") from exc

    try:
        width = int(input("New width in pixels: "))
        height = int(input("New height in pixels: "))
    except ValueError as exc:
        raise MediaError("Width and height must be integers.") from exc
    if width <= 0 or height <= 0:
        raise MediaError("Width and height must be positive.")

    output = resolve_path(input("Output image path: "))
    require_new_output(output)
    with Image.open(path) as image:
        resized = image.resize((width, height), Image.Resampling.LANCZOS)
        if output.suffix.lower() in {".jpg", ".jpeg"} and resized.mode not in {"RGB", "L"}:
            resized = resized.convert("RGB")
        resized.save(output)
    print("Saved resized image:", output)


def convert_audio_or_video(path: Path) -> None:
    if not shutil.which("ffmpeg"):
        raise MediaError("FFmpeg is required. Install it and ensure ffmpeg is on PATH.")

    output = resolve_path(input(
        "Output path with desired extension (e.g. converted.wav or converted.mp4): "
    ))
    require_new_output(output)
    run_tool(["ffmpeg", "-hide_banner", "-i", str(path), str(output)])
    print("Saved converted media:", output)


def extract_video_frame(path: Path) -> None:
    if not shutil.which("ffmpeg"):
        raise MediaError("FFmpeg is required. Install it and ensure ffmpeg is on PATH.")

    try:
        seconds = float(input("Timestamp in seconds (e.g. 2.5): "))
    except ValueError as exc:
        raise MediaError("Timestamp must be a number.") from exc
    if seconds < 0:
        raise MediaError("Timestamp cannot be negative.")

    output = resolve_path(input("Output image path (e.g. frame.png): "))
    if output.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
        raise MediaError("Use .png, .jpg, .jpeg, or .webp output.")
    require_new_output(output)
    run_tool([
        "ffmpeg", "-hide_banner", "-loglevel", "error",
        "-ss", str(seconds), "-i", str(path), "-frames:v", "1", str(output)
    ])
    print("Extracted frame:", output)


def show_menu(path: Path) -> None:
    kind = identify_kind(path)
    while True:
        print("\n=== MULTIMEDIA MENU ===")
        print("1. Inspect metadata")
        if kind == "image":
            print("2. Convert image format")
            print("3. Resize image")
        if kind in {"audio", "video"}:
            print("4. Convert audio/video using FFmpeg")
        if kind == "video":
            print("5. Extract a video frame")
        print("0. Exit")

        choice = input("Choose: ").strip()
        try:
            if choice == "0":
                return
            elif choice == "1":
                inspect_media(path)
            elif choice == "2" and kind == "image":
                convert_image(path)
            elif choice == "3" and kind == "image":
                resize_image(path)
            elif choice == "4" and kind in {"audio", "video"}:
                convert_audio_or_video(path)
            elif choice == "5" and kind == "video":
                extract_video_frame(path)
            else:
                print("Invalid option for this file type.")
        except (MediaError, OSError, ValueError) as exc:
            print(f"Operation failed: {exc}")


def main() -> None:
    try:
        raw_path = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else input(
            "Enter image/audio/video path: "
        )
        path = resolve_path(raw_path)
        require_file(path)
        show_menu(path)
    except (MediaError, FileNotFoundError, PermissionError, OSError) as exc:
        print(f"Error: {exc}")


if __name__ == "__main__":
    main()
