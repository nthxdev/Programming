from math import isqrt
import calendar
# Simple calculator: addition, subtraction, multiplication, division, modulo, and exponentiation.
def simple_calculator():
    while True:
        inputs = input("Enter num1 num2 (or q to quit): ").split()
        if inputs == ["q"] or inputs == ["Q"]:
            print("Exiting from calculator...")
            break
        if len(inputs) != 2:
            print("Please enter exactly two numbers.")
            continue
        try:
            num1, num2 = map(int, inputs)
        except ValueError:
            print("Please enter valid integers.")
            continue
        op = input("Enter Operator: ")
        num_list = [num1, num2]
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
    number = float(num)
    square = number ** 2
    cube = number ** 3
    print(f"Square of {number} is {square}")
    print(f"Cube of {number} is {cube}")

# Square root and cube root calculator
# used - so dont give complex result for negative numbers
def root_calculator():
    number = float(input("Enter a number: "))
    if number < 0:
        print("Square root: Not a real number")
        cube_root = -((-number) ** (1 / 3))
    else:
        print(f"Square root: {number ** 0.5}")
        cube_root = number ** (1 / 3)
    print(f"Cube root: {cube_root}")


# Check if number is positive or negative
def number_classification():
    num = input("Enter a number to classify (or 'q' to quit): ")
    number = int(num)
    if number > 0:
        print(f"{number} is a positive number.")
    elif number < 0:
        print(f"{number} is a negative number.")
    else:
        print(f"{number} is zero.")

# check if number is even or odd
def even_odd_checker():
    num = input("Enter a number to check if it's even or odd (or 'q' to quit): ")
    number = int(num)
    if number % 2 == 0:
        print(f"{number} is an even number.")
    else:
        print(f"{number} is an odd number.")

# Largest, smallest, and second-largest elements in a collection from list
def largest_smallest_second_largest():
    num_list = input("Enter a list of numbers separated by spaces (or 'q' to quit): ")
    numbers = list(map(int, num_list.split()))
    if len(numbers) < 2:
        print("Please enter at least two numbers.")
        return
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

# Leap year checker
def leap_year_checker():
    year = input("Enter a year to check if it's a leap year (or 'q' to quit): ")
    year_int = int(year)
    if (year_int % 4 == 0 and year_int % 100 != 0) or (year_int % 400 == 0):
        print(f"{year_int} is a leap year.")
    else:
        print(f"{year_int} is not a leap year.")

# factorial of number
def factorial():
    n = int(input("Enter a number: "))
    choice = input(
        "Enter 1 for factorial using loop or "
        "2 for factorial using recursion: "
    )
    if n < 0:
        print("Factorial is not defined for negative numbers.")
        return
    if choice == "1":
        result = 1
        for i in range(1, n + 1):
            result *= i
        print(f"Factorial using loop: {result}")
    elif choice == "2":
        def recursive_factorial(num):
            if num <= 1:
                return 1
            return num * recursive_factorial(num - 1)
        print(f"Factorial using recursion: {recursive_factorial(n)}")
    else:
        print("Invalid choice. Please enter 1 or 2.")


# generate fibonacci sequence
def fibonacci_rec(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
print(f"Fibonacci using recursion: {fibonacci(n)}")
def fibonacci():
    n = int(input("How many Fibonacci terms do you want? "))
    if n < 0:
        print("Please enter a non-negative number.")
        return
    a, b = 0, 1
    sequence = []
    for _ in range(n):
        sequence.append(a)
        a, b = b, a + b
    print("Fibonacci sequence:", sequence)
    fibonacci_rec(n)


# sum of first n natural numbers
def sum_of_n_num():
    choice = input(
        "Enter 1 for sum using loop or "
        "2 for sum using recursion: "
    )
    n = int(input("Enter N: "))
    if n < 0:
        print("Please enter a non-negative number.")
        return
    if choice == "1":
        total = 0
        for i in range(1, n + 1):
            total += i
        print(f"Sum is: {total}")
    elif choice == "2":
        def recursive_sum(num):
            if num == 0:
                return 0
            return num + recursive_sum(num - 1)
        print(f"Sum is: {recursive_sum(n)}")
    else:
        print("Invalid choice. Please enter 1 or 2.")



# list first n even numbers
def first_n_even_num():
    n = int(input("Enter N: "))
    if n < 0:
        print("Please enter a non-negative integer.")
        return
    for i in range(1, n + 1):
        print(i * 2, end=" ")
    print()


# table of n number to n range
def table_of_n():
    n = int(input("Enter N: "))
    n_range = int(input("Enter range: "))
    for i in range (1, n_range+1):
        print(f"{n} x {i} = {n*i}")


# find divisble number of number range
def divisble_numbers():
    start = int(input("Enter start of interval: "))
    end = int(input("Enter end of interval: "))
    divisor = int(input("Enter divisor: "))
    if divisor == 0:
        print("Divisor cannot be zero.")
        return
    numbers = []
    for n in range(start, end + 1):
        if n % divisor == 0:
            numbers.append(n)
    print(
        f"Numbers divisible by {divisor} "
        f"in the interval [{start}, {end}]: {numbers}"
    )


#  Check is Prime
def is_prime():
    n = int(input("Enter N: "))
    if n < 2:
        return False
    if n % 2 == 0:
        return n == 2
    # check if any odd is not prime 
    # we only need to test divisors up to its square root. 
    # If no smaller divisor works, no bigger one will work either.
    for d in range(3, int(n**0.5) + 1, 2): # get primes
        if n % d == 0:
            return False
    return True
print(is_prime())

# check if number is prime or composite
def prime_or_composite():
    n = int(input("Enter a number: "))
    if n < 2:
        return "neither prime nor composite"
    for divisor in range(2, int(n**0.5) + 1):
        if n % divisor == 0:
            return "composite"
    return "prime"
print(prime_or_composite())

# check prime numbers in an interval
def primes_in_interval():
    start = int(input("Enter start: "))
    end = int(input("Enter end: "))
    primes = []
    for n in range(max(2, start), end + 1):
        for divisor in range(2, int(n**0.5) + 1):
            if n % divisor == 0:
                break
        else:
            primes.append(n)
    return primes
print(primes_in_interval())

# find factors of Numbers range
def factors():
	number = int(input("Enter a number: "))
    if number <= 0:
        print("Please enter a positive integer.")
        return
    result = []
    for i in range(1, isqrt(number) + 1):
        if number % i == 0:
            result.append(i)
            if i != number // i:
                result.append(number // i)
    print("Factors:", sorted(result))

# check of an armstrong numbers
# An Armstrong number is a number that equals the sum of its digits, each raised to the power of how many digits it has.
# Example: 153 has 3 digits.
# 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153
def is_armstrong():
    number = int(input("Enter a number: "))
    if number < 0:
        print("Negative numbers are not Armstrong numbers.")
        return
    digits = str(number)
    power = len(digits)
    total = sum(int(digit) ** power for digit in digits)
    if total == number:
        print(f"{number} is an Armstrong number.")
    else:
        print(f"{number} is not an Armstrong number.")

# check for perfect square
def is_perfect_square():
    number = int(input("Enter a number: "))
    if number < 0:
        print("Negative numbers cannot be perfect squares.")
        return
    root = isqrt(number)
    if root * root == number:
        print(f"{number} is a perfect square.")
    else:
        print(f"{number} is not a perfect square.")
    # For very large integers, floating-point square roots can lose precision. A fully integer-safe version uses `math.isqrt()`:
    # from math import isqrt
    # def is_perfect_square(n):
    #     return n >= 0 and isqrt(n) ** 2 == n

# Check for spy numbers

def is_spy():
    number = int(input("Enter a number: "))
    if number < 0:
        print("Please enter a non-negative integer.")
        return
    digits = str(number)
    digit_sum = sum(int(digit) for digit in digits)
    digit_product = 1
    for digit in digits:
        digit_product *= int(digit)
    if digit_sum == digit_product:
        print(f"{number} is a Spy number.")
    else:
        print(f"{number} is not a Spy number.")


# Reverse a number using arithmetic
def reverse_arithmetic():
    n = int(input("Enter a number: "))
    sign = -1 if n < 0 else 1
    n = abs(n)
    reversed_number = 0
    while n > 0:
        digit = n % 10
        reversed_number = reversed_number * 10 + digit
        n //= 10
    print(f"Reversed number: {sign * reversed_number}")

# Convert decimal to binary, octal, and hexadecimal
def convert_number():
    number = int(input("Enter a decimal number: "))
    print("Binary:", bin(number))
    print("Octal:", oct(number))
    print("Hexadecimal:", hex(number))
    def convert_manual(n, base):
        if n == 0:
            return "0"
        digits = "0123456789ABCDEF"
        result = ""
        while n > 0:
            remainder = n % base
            result = digits[remainder] + result
            n //= base
        return result
    n = abs(number)
    sign = "-" if number < 0 else ""
    print("Binary (manual):", sign + convert_manual(n, 2))
    print("Octal (manual):", sign + convert_manual(n, 8))
    print("Hexadecimal (manual):", sign + convert_manual(n, 16))

# Convert decimal to binary, octal, and hexadecimal using recursion
def convert_recursive():
    number = int(input("Enter a decimal number: "))
    digits = "0123456789ABCDEF"
    def convert(n, base):
        if n < base:
            return digits[n]
        return convert(n // base, base) + digits[n % base]
    sign = "-" if number < 0 else ""
    number = abs(number)
    print("Binary:", sign + convert(number, 2))
    print("Octal:", sign + convert(number, 8))
    print("Hexadecimal:", sign + convert(number, 16))

# Calculate powers of two using a loop
def powers_of_two():
    limit = int(input("Enter the maximum exponent: "))
    if limit < 0:
        print("Exponent must be non-negative.")
        return
    value = 1
    powers = []
    for i in range(limit + 1):
        print(f"2^{i} = {value}")
        powers.append(value)
        value *= 2
    print("Powers list:", powers)

# Display a month or year calendar
def show_calendar():
    choice = input("Enter 'month' or 'year': ").lower()
    year = int(input("Enter year: "))
    if choice == "month":
        month = int(input("Enter month (1-12): "))
        if 1 <= month <= 12:
            print(calendar.month(year, month))
        else:
            print("Invalid month.")
    elif choice == "year":
        print(calendar.calendar(year))
    else:
        print("Invalid choice.")