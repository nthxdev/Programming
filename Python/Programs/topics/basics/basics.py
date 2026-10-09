import os
from datetime import date
import keyword
import random
from enum import Enum

# add Two Numbers
def add_two_numbers():
    num1 = int(input("Enter num1: "))
    num2 = int(input("Enter num2: "))
    print(f"Sum of {num1} and {num2} is {num1+num2}")
    # much better
    # map() applies a function to every item in a list.
    # num1, num2 = map(int, input("Enter numbers: ").split())
    # print(f"Sum of {num1} and {num2} is {num1 + num2}")

# Swap two Variables
def swap_two_variables():
    # In python much easier due to tuple packing/unpacking happens internally
    """
    Packing
    t = 1, 2, 3
    This becomes: (1, 2, 3)

    Unpacking
    a, b, c = (1, 2, 3)
    """
    a=int(input("Enter: "))
    b=int(input("Enter: "))
    print(f"Before swap -> {a,b}")
    a,b=b,a
    print(f"After swap -> {a,b}")

# Read Multiple Inputs from the user
def read_multiple_inputs():
    # map() applies a function to every item in a list.
    # map(function, iterable) OR map(function, iterable1, iterable2)
    num1, num2 = map(int, input("Enter numbers: ").split())
    print(f"Sum of {num1} and {num2} is {num1 + num2}")

# Parse a string into an integer or float
def parse_string():
    num1 = int(input("Enter an integer: "))
    num2 = float(input("Enter a float: "))
    print(f"Integer: {num1}, Float: {num2}")

# Print output without newline
def print_without_newline():
    # print(*objects, sep=' ', end='\n', file=sys.stdout, flush=False)
    print("Print Without Newline", end="")

# count from 1 to n
def count_to_n():
    n = int(input("Count from 1 to: "))
    for i in range(1, n + 1):
        print(i)

# Find the age at which a person will turn 100
def age_to_100():
    name = input("Enter your name: ")
    age = int(input("Enter your age: "))
    current_year = date.today().year
    year = current_year + (100 - age)
    print(f"{name}, you will turn 100 years old in the year {year}.")

# Add Pattern - n + nn + nnn + nnnn .... 
def add_pattern():
    num = int(input("Enter a number: "))
    str = " "
    for i in range(1, num+1):
        if i == num:
            str += f"{"n"*i}"
        else:
            str += f"{"n"*i} + "
    print(f"Pattern is {str}")
# A Better way to do the above is using list comprehension and join() method
# def add_pattern():
#     num = int(input("Enter a number: "))
#     terms = [f"n" * i for i in range(1, num + 1)
#     pattern = " + ".join(terms)
#     print(f"Pattern is {pattern}")

# Add Pattern for n = 5; => n + nn + nnnn + nn + n + nnnn + nnn + nn + n 
def add_pattern_2():
    num = int(input("Enter a num: " ))
    list = [1, ]
    str = " "
    for i in range(1, num+1):
        if i <= 1:
            continue
        elif i % 2 == 0:
            list.append(i)
    for i in list:
        str += f"{"n" * i} + "
    # pattern
    # l[::-1]
    #   │ │ │
    #   │ │ └── step = -1 → backwards
    #   │ └──── stop = omitted
    #   └────── start = omitted
    size=len(list)
    for i in list[-2::-1]:
        str += f"{"n" * i} + "
        for j in range(size+1, 0, -1):
            if j == 1:
                str += f"{"n"*i}"
            else:
                str += f"{"n" * j} + "
    print(str)

# Check whether a string is a valid Python keyword
def check_keyword():
    str = input("Enter a string: ")
    if keyword.iskeyword(str):
        print(f"{str} is a valid Python keyword.")
    else:
        print(f"{str} is not a valid Python keyword.")
    # or without keyword module create list of keywords

# Check whether a value is an instance of a type using type() and isinstance()
def check_instance_of_type():
    value = input("Enter a value: ")
    type_name = input("Enter a type (int, float, str, list, dict, tuple): ")
    # input returns a stirng but we need actual value and type object
    # eval() evaluates the text as a Python expression
    val = eval(value)
    user_val_type = eval(type_name)
    # isinstance() needs the actual type object
    print(isinstance(val, user_val_type))

# Represent enumerated constants using enum.Enum
def signals():
    # Inherit the Enum Class
    class Color(Enum):
        RED = 1
        GREEN = 2
        BLUE = 3
    color = random.choice(list(Color))
    print(color)

PROGRAMS = {
    1: add_two_numbers,
    2: swap_two_variables,
    3: read_multiple_inputs,
    4: parse_string,
    5: print_without_newline,
    6: count_to_n,
    7: age_to_100,
    8: add_pattern,
    9: add_pattern_2,
    10: check_keyword,
    11: check_instance_of_type,
    12: signals
}

def show_menu():
    print("1. Add Two Numbers")
    print("2. Swap Two Variables without temprorary variable")
    print("3. Read Multiple Inputs from the user")
    print("4. Parse a string into an integer or float")
    print("5. Print output without newline")
    print("6. Count from 1 to n")
    print("7. Find the age at which a person will turn 100")
    print("8. Add Pattern - n + nn + nnn + nnnn ....")
    print("9. Add Pattern for n = 5; => n + nn + nnnn + nn + n + nnnn + nnn + nn + n")
    print("10. Check whether a string is a valid Python keyword")
    print("11. Check whether a value is an instance of a type using type() and isinstance()")
    print("12. Represent enumerated constants using enum.Enum")
    print("q(quit). Exit")

def main():
    while True:
        show_menu()
        choice = input("Enter your choice: ").strip().lower()

        if choice == "q":
            print("Exiting...")
            break

        program=PROGRAMS.get(choice)
        if program is None:
            print("Invalid choice. Please select valid choice or q to quit.")
            continue
        try:
            program()
        except Exception as e:
            print(f"Program failed: {exc}")

if __name__ == "__main__":
    try:
        import os

        filename = os.path.basename(__file__)
        path = os.path.abspath(__file__)

        print(f"Running {filename}")
        print(f"pwd: {path}")

    except Exception as e:
        print(f"Could not get file information: {e}")
    main()