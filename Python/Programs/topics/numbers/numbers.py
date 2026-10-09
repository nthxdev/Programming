# Simple calculator: addition, subtraction, multiplication, division, modulo, and exponentiation.
def simple_calculator():
    while True:
        inputs = input("Enter num1 num2 (or q to quit): ").split()
        if "q" in inputs:
            print("Exiting from calculator...")
            break
        op = input("Enter Operator: ")
        num_list = list(map(int, inputs))
        match op:
            case "+":
                print(num_list[0] + num_list[1])
            case "-":
                print(num_list[0] - num_list[1])
            case "*":
                print(num_list[0] * num_list[1])
            case "/":
                if num_list[1] == 0:
                    print("Cannot divide by zero")
                else:
                    print(num_list[0] / num_list[1])
            case "%":
                if num_list[1] == 0:
                    print("Cannot divide by zero")
                else:
                    print(num_list[0] % num_list[1])
            case "**":
                print(num_list[0] ** num_list[1])
            case _:
                print("Invalid operator")

# Area calculator: circle, rectangle, and square
def area_calculator():
    shape = input("Enter shape (circle(circ), rectangle(rect), square(sq)) or 'q' to quit: ").lower()
    match shape:
        case "circle" | "circ":
            radius = float(input("Enter radius: "))
            area = 3.14159 * radius ** 2
            print(f"Area of circle: {area}")
        case "rectangle" | "rect":
            length = float(input("Enter length: "))
            width = float(input("Enter width: "))
            area = length * width
            print(f"Area of rectangle: {area}")
        case "square" | "sq":
            side = float(input("Enter side length: "))
            area = side ** 2
            print(f"Area of square: {area}")
        case _:
            print("Invalid shape")

# Temperature converter: Celsius ↔ Fahrenheit
def temperature_converter():
    conversion = input("Enter conversion (C to F or F to C) or 'q' to quit: ").lower()
    match conversion:
        case "c to f":
            celsius = float(input("Enter temperature in Celsius: "))
            fahrenheit = (celsius * 9/5) + 32
            print(f"{celsius}°C is {fahrenheit}°F")
        case "f to c":
            fahrenheit = float(input("Enter temperature in Fahrenheit: "))
            celsius = (fahrenheit - 32) * 5/9
            print(f"{fahrenheit}°F is {celsius}°C")
        case _:
            print("Invalid conversion type")

# Speed converter: km/h ↔ miles/h
def speed_converter():
    conversion = input("Enter conversion (km/h to mph or mph to km/h) or 'q' to quit: ").lower()
    match conversion:
        case "km/h to mph":
            kmh = float(input("Enter speed in km/h: "))
            mph = kmh * 0.621371
            print(f"{kmh} km/h is {round(mph, 2)} mph")
        case "mph to km/h":
            mph = float(input("Enter speed in mph: "))
            kmh = mph / 0.621371
            print(f"{mph} mph is {round(kmh, 2)} km/h")
        case _:
            print("Invalid conversion type")

# Height converter: centimeters → feet and inches
def height_converter():
    conversion = input("Enter conversion (cm to ft/in) or 'q' to quit: ").lower()
    match conversion:
        case "cm to ft/in":
            cm = float(input("Enter height in centimeters: "))
            total_inches = cm / 2.54
            feet = int(total_inches // 12)
            inches = total_inches % 12
            print(f"{cm} cm is {feet} feet and {inches:.2f} inches")
        case _:
            print("Invalid conversion type")

# Square and cube calculator
def square_cube_calculator():
    num = input("Enter a number to calculate its square and cube (or 'q' to quit): ")
    try:
        number = float(num)
        square = number ** 2
        cube = number ** 3
        print(f"Square of {number} is {square}")
        print(f"Cube of {number} is {cube}")
    except ValueError:
        print("Invalid input. Please enter a valid number.")

# Square root and cube root calculator
def root_calculator():
    num = input("Enter a number to calculate its square root and cube root (or 'q' to quit): ")
    try:
        number = float(num)
        square_root = number ** 0.5
        cube_root = number ** (1/3)
        print(f"Square root of {number} is {square_root}")
        print(f"Cube root of {number} is {cube_root}")
    except ValueError:
        print("Invalid input. Please enter a valid number.")

# Check if number is positive or negative
def number_classification():
    num = input("Enter a number to classify (or 'q' to quit): ")
    try:
        number = int(num)
        if number > 0:
            print(f"{number} is a positive number.")
        elif number < 0:
            print(f"{number} is a negative number.")
        else:
            print(f"{number} is zero.")
    except ValueError:
        print("Invalid input. Please enter a valid integer.")

# check if number is even or odd
def even_odd_checker():
    num = input("Enter a number to check if it's even or odd (or 'q' to quit): ")
    try:
        number = int(num)
        if number % 2 == 0:
            print(f"{number} is an even number.")
        else:
            print(f"{number} is an odd number.")
    except ValueError:
        print("Invalid input. Please enter a valid integer.")

# Largest, smallest, and second-largest elements in a collection from list
def largest_smallest_second_largest():
    num_list = input("Enter a list of numbers separated by spaces (or 'q' to quit): ")
    try:
        numbers = list(map(int, num_list.split()))
        if len(numbers) < 2:
            print("Please enter at least two numbers.")
            continue
        largest = max(numbers)
        smallest = min(numbers)
        # value_if_true if condition else value_if_false
        second_largest = sorted(set(numbers))[-2] if len(set(numbers)) > 1 else None
        print(f"Largest number: {largest}")
        print(f"Smallest number: {smallest}")
        if second_largest is not None:
            print(f"Second largest number: {second_largest}")
        else:
            print("There is no second largest number (all numbers are the same).")
    except ValueError:
        print("Invalid input. Please enter valid integers.")

# Leap year checker
def leap_year_checker():
    year = input("Enter a year to check if it's a leap year (or 'q' to quit): ")
    try:
        year_int = int(year)
        if (year_int % 4 == 0 and year_int % 100 != 0) or (year_int % 400 == 0):
            print(f"{year_int} is a leap year.")
        else:
            print(f"{year_int} is not a leap year.")
    except ValueError:
        print("Invalid input. Please enter a valid year.")

# factorial of number
def factorial(n):
    num = input("Enter 1 for factorial using loop or 2 for factorial using recursion \n(or 'q' to quit): ")
    try:
        choice = int(num)
        switch (choice):
            case 1:
                result = 1
                if n <= 1:
                    return 1
                for i in range(1, n+1)
                    result *= i
                print(f"Factoril using loop: {result}")
            case 2:
                def factorial():
                    if n <= 1:
                        return 1
                    return n * factorial(n-1)
                print(f"Factorial using recursion: {factorial(n)}")
            case _:
                print("Invalid choice. Please enter 1 or 2.")

# generate fibonacci sequence
def fibonacci(n):
    num = int(input("Enter 1 for fibonacci using loop or 2 for fibonacci using recursion \n(or 'q' to quit): "))
    try:
        choie = int(num)
        switch (choice):
            case 1:
                first = 0
                second = 1
                for _ in range(n):
                    print(first, end=" ")
                    next = first + second
                    first = second
                    second = next
                print(" ")
            case 2:
                def fibonacci(n):
                    if n <= 1:
                        return n
                    return fibonacci(n-1) + fibonacci(n-2)
                print(f"Fibonacci using recursion: {fibonacci(n)}")
            case _:
                print("Invalid choice. Please enter 1 or 2.")

# sum of first n natural numbers
def sum_of_n_num():
    choice = int(input("Sum of Natural Numbers: 1 for using loop or 2 for using recursion \n(or 'q' to quit): "))
    try:
        switch(choice):
            case 1:
                n=int(input("Enter N: "))
                sum=0
                if n == 0:
                    print(f"sum is: 0")
                for i in range(1,n+1):
                    sum += i
                print(f"sum is: {sum}")
            case 2:
                def sum_of_n_num(n):
                    if n == 0:
                        return 0
                    return n + sum_of_n_num(n-1)
                n=int(input("Enter N: "))
                print(f"sum is: {sum_of_n_num(n)}")
            case _:
                print("Invalid choice. Please enter 1 or 2.")
    
# list first n even numbers
def first_n_even_num():
    n = int(input("Enter N: "))
    for i in range(1, n+1):
        print(i*2, end=" ")
        print("Invalid input. Please enter a valid integer.")

# table of n number to n range
def table_of_n():
    n = int(input("Enter N: "))
    n_range = int(input("Enter range: "))
    for i in range (1, n_range+1):
        print(f"{n} x {i} = {n*i}")

# check if number is prime or composite
def prime_or_composite():
    pass

# check prime numbers in an interval
def prime_in_interval():
    pass:

# find divisble number of number range
def divisble_numbers():
    start = int(input("Enter start of interval: "))
    end = int(input("Enter end of interval: "))
    divisor = int(input("Enter divisor: "))
    numbers = []
    for n in range(start, end + 1):
        if n % divisor == 0:
            numbers.append(n)
    printz(f"Numbers divisible by {divisor} in the interval [{start}, {end}]: {numbers}")


