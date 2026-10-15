"""
Training datasets ->	.csv, .tsv, .jsonl, .parquet
Scientific arrays ->	.npy, .npz, .h5, .hdf5
Configuration ->	.yaml, .yml, .toml, .json, .env
Code and experiments ->	.py, .ipynb, .sh
Model weights ->	.safetensors, .pt, .pth, .ckpt
Model deployment ->	.onnx, .tflite, .gguf
Logs and metrics ->	.log, .csv, .jsonl
Images, audio, video ->	.png, .jpg, .wav, .flac, .mp4
Dependencies and reproducibility ->	requirements.txt, pyproject.toml, Dockerfile
"""
from pathlib import Path
import csv
import configparser
import json
import pprint
import subprocess
import sys
import tomllib
import zipfile


def handle_file():
    # Relative paths are resolved beside this Python script.
    raw_path = input("Enter file path: ").strip().strip('"').strip("'")
    if not raw_path:
        print("No path provided.")
        return
    path = Path(raw_path).expanduser()
    if not path.is_absolute():
        path = Path(__file__).resolve().parent / path
    path = path.resolve()
    try:
        # 1. Validate path and inspect directories
        if not path.exists():
            print("Error: Path does not exist.")
            return
        if path.is_dir():
            print(f"Directory: {path}")
            for item in sorted(path.iterdir()):
                print(f"{'[DIR] ' if item.is_dir() else '[FILE]'} {item.name}")
            return
        if not path.is_file():
            print("Error: Path is not a regular file.")
            return
        ext = path.suffix.lower()
        print(f"\nPath: {path}")
        print(f"Extension: {ext or '(none)'}")
        print(f"Size: {path.stat().st_size:,} bytes")
        # 2. JSON
        if ext == ".json":
            with path.open("r", encoding="utf-8") as f:
                data = json.load(f)
            print("\nJSON data:")
            pprint.pp(data, sort_dicts=False)
        # 3. JSON Lines: one JSON value per line
        elif ext == ".jsonl":
            count = 0
            with path.open("r", encoding="utf-8") as f:
                for line_number, line in enumerate(f, start=1):
                    if not line.strip():
                        continue
                    try:
                        record = json.loads(line)
                    except json.JSONDecodeError as e:
                        print(f"Invalid JSON on line {line_number}: {e}")
                        return
                    count += 1
                    if count <= 10:
                        pprint.pp(record, sort_dicts=False)
            print(f"Total JSON records: {count}")
        # 4. CSV and TSV datasets
        elif ext in {".csv", ".tsv"}:
            delimiter = "\t" if ext == ".tsv" else ","
            row_count = 0
            with path.open(
                "r", encoding="utf-8-sig", newline=""
            ) as f:
                reader = csv.reader(f, delimiter=delimiter)
                for row_count, row in enumerate(reader, start=1):
                    if row_count <= 20:
                        print(row)
            print(f"Total rows: {row_count}")
            if row_count > 20:
                print("Displayed only the first 20 rows.")
        # 5. TOML configuration files (Python 3.11+)
        elif ext == ".toml":
            with path.open("rb") as f:
                data = tomllib.load(f)
            pprint.pp(data, sort_dicts=False)
        # 6. INI and CFG configuration files
        elif ext in {".ini", ".cfg"}:
            config = configparser.ConfigParser()
            config.read(path, encoding="utf-8")
            for section in config.sections():
                print(f"\n[{section}]")
                for key, value in config[section].items():
                    print(f"{key} = {value}")
        # 7. YAML configuration files
        elif ext in {".yaml", ".yml"}:
            try:
                import yaml
            except ImportError:
                print("Install YAML support with: python -m pip install pyyaml")
                print(path.read_text(encoding="utf-8")[:12_000])
            else:
                data = yaml.safe_load(path.read_text(encoding="utf-8"))
                pprint.pp(data, sort_dicts=False)
        # 8. Jupyter notebooks: inspect cells, do not execute them
        elif ext == ".ipynb":
            notebook = json.loads(path.read_text(encoding="utf-8"))
            cells = notebook.get("cells", [])
            print(f"Notebook cells: {len(cells)}")
            for index, cell in enumerate(cells[:20], start=1):
                source = cell.get("source", "")
                if isinstance(source, list):
                    source = "".join(source)
                print(f"\n--- Cell {index}: {cell.get('cell_type')} ---")
                print(source[:1_000])
        # 9. NumPy datasets: NPY and NPZ
        elif ext in {".npy", ".npz"}:
            try:
                import numpy as np
            except ImportError:
                print("Install NumPy with: python -m pip install numpy")
                return
            if ext == ".npy":
                array = np.load(path, mmap_mode="r", allow_pickle=False)
                print("Shape:", array.shape)
                print("Data type:", array.dtype)
            else:
                with np.load(path, allow_pickle=False) as archive:
                    for name in archive.files:
                        array = archive[name]
                        print(
                            f"{name}: shape={array.shape}, "
                            f"dtype={array.dtype}"
                        )
        # 10. Parquet: common for large ML datasets
        elif ext == ".parquet":
            try:
                import pyarrow.parquet as pq
            except ImportError:
                print("Install support with: python -m pip install pyarrow")
                return
            parquet = pq.ParquetFile(path)
            print("Rows:", parquet.metadata.num_rows)
            print("Row groups:", parquet.metadata.num_row_groups)
            print("Schema:")
            print(parquet.schema)
        # 11. HDF5: hierarchical scientific datasets
        elif ext in {".h5", ".hdf5"}:
            try:
                import h5py
            except ImportError:
                print("Install support with: python -m pip install h5py")
                return
            with h5py.File(path, "r") as hdf:
                print("Root entries:", list(hdf.keys()))
        # 12. ZIP archives: inspect without extracting
        elif ext == ".zip":
            with zipfile.ZipFile(path, "r") as archive:
                names = archive.namelist()
                for name in names[:30]:
                    print(name)

                print(f"Total archive entries: {len(names)}")
        # 13. Image metadata
        elif ext in {".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"}:
            try:
                from PIL import Image
            except ImportError:
                print("Install support with: python -m pip install pillow")
                return
            with Image.open(path) as image:
                print("Format:", image.format)
                print("Dimensions:", image.size)
                print("Color mode:", image.mode)
        # 14. Model checkpoints and other binary AI artifacts
        elif ext in {
            ".pt", ".pth", ".ckpt", ".safetensors",
            ".onnx", ".gguf", ".tflite", ".pb", ".bin",
            ".pkl", ".pickle", ".model"
        }:
            print("Recognized as a possible binary/model artifact.")
            print("Size:", path.stat().st_size, "bytes")
            print("Use the correct framework to inspect or load this file.")
            print("Do not deserialize untrusted pickle/checkpoint files.")
        # 15. Other text files, source code, logs, and scripts
        else:
            text = path.read_text(encoding="utf-8")
            print("\nText preview:")
            print(text[:12_000])
            if len(text) > 12_000:
                print("\nPreview truncated.")
            # Run Python scripts only after explicit confirmation.
            if ext == ".py":
                if path == Path(__file__).resolve():
                    print("Not running this manager script recursively.")
                    return
                choice = input(
                    "\nRun this Python file? Only run trusted code (y/N): "
                ).strip().lower()
                if choice == "y":
                    subprocess.run(
                        [sys.executable, str(path)],
                        cwd=path.parent,
                        check=False
                    )
    except FileNotFoundError:
        print("Error: File not found.")
    except PermissionError:
        print("Error: Permission denied.")
    except UnicodeDecodeError:
        print("This is not readable UTF-8 text. Use a format-specific reader.")
    except (json.JSONDecodeError, csv.Error, configparser.Error, ValueError) as e:
        print(f"Could not parse the file: {e}")
    except OSError as e:
        print(f"File-system error: {e}")
