from pathlib import Path
# Basic Exception Syntax 
def main():
    # Custom exception
    class NegativeNumberError(Exception):
        pass
    try:
        # Risky operations
        a = int(input("Enter numerator: "))
        b = int(input("Enter denominator: "))
        # Raise a custom exception
        if a < 0 or b < 0:
            raise NegativeNumberError("Numbers cannot be negative!")
        result = a / b
    except ValueError as e:
        print(f"Invalid input: {e}")
    except ZeroDivisionError as e:
        print(f"Math error: {e}")
    except NegativeNumberError as e:
        print(f"Custom error: {e}")
    except Exception as e:
        print(f"Unexpected error: {type(e).__name__}: {e}")
    else:
        # Runs only when try completes successfully
        print(f"Result: {result}")
    finally:
        # Always runs
        print("Execution finished.")


# Error HANDLING
# --- Exception ---
# BaseException
# +-- KeyboardInterrupt
# +-- Exception
#     +-- ArithmeticError
#         +-- ZeroDivisionError
#     +-- AssertionError
#     +-- AttributeError
#     +-- EOFError
#     +-- ImportError
#         +-- ModuleNotFoundError
#     +-- LookupError
#         +-- KeyError
#     +-- NameError
#     +-- SyntaxError
#         +-- IndentationError
#     +-- ValueError


# Handle ZeroDivisionError using try-except
def handle_zero_division():
    try:
        a = float(input("Enter numerator: "))
        b = float(input("Enter denominator: "))
        print("Result:", a / b)
    except ZeroDivisionError:
        print("Error: Cannot divide by zero.")
    except ValueError:
        print("Error: Enter valid numbers.")


# Handle FileNotFoundError
def handle_file_not_found():
    filename = input("Enter filename: ")
    try:
        print(Path(filename).read_text(encoding="utf-8"))
    except FileNotFoundError:
        print("Error: File does not exist.")
    except PermissionError:
        print("Error: Permission denied.")


# Handle multiple exceptions in a single try block
def handle_multiple_exceptions():
    try:
        a = int(input("Enter numerator: "))
        b = int(input("Enter denominator: "))
        numbers = [10, 20, 30]
        index = int(input("Enter list index (0-2): "))

        print("Division:", a / b)
        print("List value:", numbers[index])

    except (ValueError, ZeroDivisionError, IndexError) as e:
        print(f"Error: {type(e).__name__}: {e}")


# Handle multiple exceptions with separate handlers
def handle_exceptions_separately():
    try:
        filename = input("Enter filename: ")
        index = int(input("Enter line index (starting at 0): "))

        with open(filename, "r", encoding="utf-8") as file:
            lines = file.readlines()

        print(lines[index])

    except FileNotFoundError:
        print("Error: File not found.")
    except PermissionError:
        print("Error: Permission denied.")
    except ValueError:
        print("Error: Index must be an integer.")
    except IndexError:
        print("Error: Line index is out of range.")
    except OSError as e:
        print(f"File system error: {e}")





