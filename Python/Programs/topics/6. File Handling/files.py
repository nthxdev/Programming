# Files, directories, and exceptions 
# -> For file handling, learn `pathlib.Path`, `with open(...)`, and appropriate exception handling. For elapsed time, use `time.perf_counter()` for measuring durations
from pathlib import Path
import csv
import time
import re
import json
import os
base = Path(__file__).resolve().parent

# Read a file and print its contents
# Append text to a file
def append_txt_file():
# Read and write text files using context managers
    file = base / "file.txt"
    data = file.read_text() # Read Entire File (Path)
    # context manager manages a resource automatically with is the context manager syntax
    with file.open("a+", encoding="utf-8") as f:
        f.write("Writing On A File!\n")
        # f.readline()   # Read one line
        # f.readlines()  # Read all lines into a list
        # f.seek() # helps moves cursor in file
        print(f"TEXT IN FILE {file}: {f.read()}")

# Copy the contents of one file to another
def copy_file_content():
    source, destination = input("Enter Full source destinaton file: ").strip().split(maxsplit=1)
    source = base / source
    destination = base / destination
    destination.write_text(source.read_text(encoding="utf-8"), encoding="utf-8")

# Get a file's extension
def get_file_extension():
    filename = input("Enter filename: ")
    file = Path(filename)
    print(f"File extnesion is: {file.suffix}")


# Safely create a nested directory
def safely_create_dict():
    directory = Path(input("Enter Directory Path: "))
    directory.mkdir(parents=True, exist_ok=True)


# measure elapsed time
def elapsed_time():
    start = time.perf_counter()
    total = sum(range(1_00_000))
    print(total)
    end = time.perf_counter()
    print(f"Elapsed time: {end - start:.6f} seconds")


# Program to count lines and words in a file 
def count_word_lines():
    filename = input("Enter filename: ")
    try:
        file = base / filename
    except:
        print(F"FILE NOT Found at location: {base}/{file}")
    text = file.read_text(encoding="utf-8")
    lines = len(text.splitlines())
    words = len(re.findall(r"\b[\w']+\b", text))
    print(f"Lines: {lines}")
    print(f"words: {words}")


# Read CSV files
def read_csv():
    # with open("cs50.csv", "r") as file:
    #     next(file)  # Skip header
    file = open("cs50.csv", "r")    # Read CSV file
    students = []
    for line in file:
        name, profession = line.rstrip().split(",")
        students.append({
            "name": name,
            "Profession": profession
        })
    print(f"Before Sort: {students}")
    def getname(student):
        return student["name"]
    # passing it student sorted index over dictionaries in it
    # getname sort those dictionary on basis of each "name" key of dict
    # sorted(iterable, /, *, key=None, reverse=False)
    sorted_students = sorted(students, key=getname)
    # == OR ==
    # for student in sorted(students, key=lambda student: student["name"]):
    for student in sorted_students:
        print(f"Key: {student['name']}")
    print(f"After Sort: {sorted_students}")
    file.close()

# Read CSV file using Dict.reader
def better_csv_read():
    students = []
    with open("cs50.csv", newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        # print(reader) # <csv.DictReader object at 0xmemoryadrress>
        for row in reader:
            # print(row) # {dictionary}
            students.append({
                "name": row["name"], "profession": row["profession"]
            })
    # Step 2: Write the data to a separate CSV file.
    with open("output.csv", "w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(
            file,
            fieldnames=["name", "profession"]
        )

        writer.writeheader()
        writer.writerows(students)
    return students

# json files
def json_files():
    filename = input("Enter JSON Filename: ")
    file = base / filename
    with file.open("r", encoding="utf-8") as f:
        data = json.load(f)
    print(data)

# os
def os_path():
    filename = input("Enter Filename: ")
    for root, dirs, files in os.walk("."):
        if filename in files:
            found_path = os.path.abspath(
                os.path.join(root, filename)
            )
            print("File location:", found_path)
            return
    print("File not found.")
