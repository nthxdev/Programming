# Files, directories, and exceptions 
# -> For file handling, learn `pathlib.Path`, `with open(...)`, and appropriate exception handling. For elapsed time, use `time.perf_counter()` for measuring durations
from pathlib import Path
import csv
# Read a file and print its contents
base = Path(__file__).resolve().parent

# Append text to a file
def append_txt_file()
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




# Measure elapsed execution time

# Program to count lines and words in a file 


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
    sorted_students = sorted(students, key=getname)
    # OR
    # for student in sorted(students, key=lambda student: student["name"]):
    for student in sorted_students:
        print(f"Key: {student['name']}")
    print(f"After Sort: {sorted_students}")
    file.close()

# Read CSV file using Dict.reader
def better_csv_read():
    students = []
    std = []
    with open("cs50.csv") as file:
        reader = csv.DictReader(file) 
        # print(reader) # <csv.DictReader object at 0xmemoryadrress>
        for row in reader:
            # print(row) # {dictionary}
            students.append({"name": row["name"], "home": row["home"]})
    writer = csv.DictWriter(file, fieldnames=["name", "home"])
    writer.writerow({"name": name, "home": home})

# json files
