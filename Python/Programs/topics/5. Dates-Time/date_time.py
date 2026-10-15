# Datetime, calendars, timing, mathematical data
# -> Matrix exercises should use nested lists first. Later, you can repeat them using NumPy to compare readability and performance.
import datetime as dt
import calendar

def date_time():
    # Print current time
    current_time = dt.datetime.now()
    print(f"Current time: {current_time}") # something like - 2026-10-12 10:30:45.123456
    # Convert a string into a `datetime` object
    independence_date = "15/08/1947 14:30"
    independence = dt.datetime.strptime(
        independence_date, "%d/%m/%Y %H:%M"
    )
    print(type(independence))
    # Calculate the time elapsed between two events
    print(f"it's been {(current_time - independence).days} DAYS or {(current_time - independence).seconds} SECONDS since India's independence") # returns timedelta
    # Display a calendar
    print(calendar.calendar(2026, 1))
    # Display a specific month
    print(calendar.month(2005, 8))
    # The monthrange() function returns two values: the weekday of the first day and the number of days in that month. The [1] selects the second value
    print(calendar.monthrange(2026, 10)[1])

# Generate and analyze numerical sequences
def basic_list_analysis():
    numbers = list(range(1,6))
    print(f"Analysis on {numbers}: \n1. Sum of numbers: {sum(numbers)}\n2. Minimum digit: {min(numbers)}\n3. Max digit: {max(numbers)}\n4. length of list: {len(numbers)}")

# Add matrices
def add_matrices():
    A = [
        [1, 2],
        [3, 4]
    ]
    B = [
        [5, 6],
        [7, 8]
    ]
    result = []
    for i in range(n):
        row = []
        for j in range(2):
            row.append(A[i][j]+B[i][j])
        result.append(row)

# Multiply matrices
def mul_matrices():
    # Add On:
    # Q1 - get matrix input for as many matrix and as many row and columns | or keep entering value | or write in matrix format
    # Q2 - check like row = column for matrix multiplication
    A = [
        [1, 2],
        [3, 4]
    ]
    B = [
        [5, 6],
        [7, 8]
    ]
    result = []
        # Other Way
    for i in range(2):
        row = []
        for j in range(2):
            save = 0
            for k in range(2):
                print(A[i][k], B[k][j])
                print(f"current {A[i][k]} * {B[k][j]} => {A[i][k] * B[k][j]}")
                # save += A[i][k] * B[k][j]
                # row.append(A[i][])
                # print("save value: ", save)
            row.append(save)
        # print("current row: ", row)
        result.append(row)
    # print(result)

