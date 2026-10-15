from pathlib import Path
import csv
import json
import shutil
import tempfile
base = Path(__file__).resolve().parent
def main():
    class FileOperationError(Exception):
        """Custom exception for file-handling errors."""
    # Create a safe workspace for this demonstration.
    with tempfile.TemporaryDirectory() as temp_dir:
        base = Path(temp_dir)
        text_file = base / "notes.txt"
        copy_file = base / "notes_copy.txt"
        json_file = base / "data.json"
        csv_file = base / "data.csv"
        renamed_file = base / "renamed_notes.txt"
        nested_dir = base / "parent" / "child"
        try:
            # 1. Paths: create, inspect, and join.
            print("Workspace:", base)
            print("Filename:", text_file.name)
            print("Suffix:", text_file.suffix)
            print("Parent:", text_file.parent)
            print("Exists before creation:", text_file.exists())
            # 2. Create/write: mode "w" creates or truncates a file.
            with text_file.open("w", encoding="utf-8") as f:
                f.write("First line\n")
                f.write("Python file handling\n")
                f.writelines(["Third line\n", "Fourth line\n"])
            # 3. Read all text with Path.
            print("\nFull text:\n", text_file.read_text(encoding="utf-8"))
            # 4. Read using a context manager and read().
            with text_file.open("r", encoding="utf-8") as f:
                print("Read all:", repr(f.read()))
                print("Closed automatically:", f.closed)
            # 5. readline(), readlines(), and line-by-line iteration.
            with text_file.open("r", encoding="utf-8") as f:
                print("First line:", repr(f.readline()))
                print("Remaining lines:", f.readlines())
            with text_file.open("r", encoding="utf-8") as f:
                print("Line-by-line:")
                for line in f:
                    print(line.rstrip("\n"))
            # 6. Append: mode "a" adds content at the end.
            with text_file.open("a", encoding="utf-8") as f:
                f.write("Appended line\n")
            # 7. Read + append: "a+" allows reading, but writes append.
            with text_file.open("a+", encoding="utf-8") as f:
                f.write("Another appended line\n")
                f.seek(0)
                print("\na+ read from start:\n", f.read())
            # 8. Read + write: "r+" preserves existing content.
            # Writing starts at the current cursor position.
            with text_file.open("r+", encoding="utf-8") as f:
                f.seek(0)
                f.write("UPDATED")
                f.flush()
                f.seek(0)
                print("After r+ update:", f.readline().rstrip())
            # 9. Binary mode: useful for images, PDFs, and other bytes.
            binary_file = base / "sample.bin"
            with binary_file.open("wb") as f:
                f.write(b"\x00\x01\x02")
            with binary_file.open("rb") as f:
                print("Binary data:", f.read())
            # 10. Cursor operations: tell() reports position; seek() moves it.
            with text_file.open("r", encoding="utf-8") as f:
                print("Initial cursor:", f.tell())
                print("Read 7 characters:", f.read(7))
                print("Cursor after read:", f.tell())
                f.seek(0)
                print("After seek(0):", repr(f.readline()))
            # 11. Copy a file.
            shutil.copyfile(text_file, copy_file)
            print("\nCopied successfully:", copy_file.exists())
            # 12. Metadata and checks.
            print("Is a file:", text_file.is_file())
            print("Size in bytes:", text_file.stat().st_size)
            print("Absolute path:", text_file.resolve())
            # 13. Create nested directories safely.
            nested_dir.mkdir(parents=True, exist_ok=True)
            print("Nested directory exists:", nested_dir.is_dir())
            # 14. JSON: serialize Python data and deserialize it.
            data = {
                "name": "Pengu",
                "skills": ["Python", "file handling"],
                "active": True,
            }
            with json_file.open("w", encoding="utf-8") as f:
                json.dump(data, f, indent=4)
            with json_file.open("r", encoding="utf-8") as f:
                loaded_data = json.load(f)
            print("\nJSON data:", loaded_data)
            print("JSON string:", json.dumps(loaded_data, indent=2))
            # 15. CSV: write rows and read them back.
            rows = [
                ["name", "score"],
                ["Aman", 85],
                ["Riya", 92],
            ]
            with csv_file.open("w", newline="", encoding="utf-8") as f:
                writer = csv.writer(f)
                writer.writerows(rows)
            with csv_file.open("r", newline="", encoding="utf-8") as f:
                reader = csv.reader(f)
                print("\nCSV rows:")
                for row in reader:
                    print(row)
            # 16. Exception handling for a missing file.
            try:
                missing_file = base / "missing.txt"
                missing_file.read_text(encoding="utf-8")
            except FileNotFoundError as e:
                print("\nHandled missing file:", e.filename)
            # 17. Rename/move a file.
            copy_file.rename(renamed_file)
            print("Renamed file exists:", renamed_file.exists())
            # 18. Custom exception.
            if not text_file.is_file():
                raise FileOperationError("Expected text file was not found.")
            print("\nAll file-handling demonstrations completed.")
        except PermissionError as e:
            print("Permission denied:", e)
        except IsADirectoryError as e:
            print("Expected a file, got a directory:", e)
        except OSError as e:
            print("Filesystem error:", e)
        except (json.JSONDecodeError, csv.Error) as e:
            print("Data-format error:", e)
        except FileOperationError as e:
            print("Custom file-operation error:", e)
        finally:
            # The TemporaryDirectory context manager removes the workspace
            # after this block, even if an exception occurs.
            print("File-handling run finished; temporary workspace will be cleaned up.")
