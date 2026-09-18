# # How python support lambdas
# Functions are first-class objects in Python.
# They can be stored, passed, returned, and assigned.
# Python supports higher-order functions (functions taking/returning functions).

# Lambdas are anonymous, single-expression function.
# Anonymous one-expression function.
# Can be assigned and called repeatedly.
# Cannot contain multiple statements/blocks (if, for, while, return, etc.).

square = lambda x: x ** 2
print(square(5))  # Output: 25
# lambda created and called immediately. (anonymous function)
print((lambda x: x + 2)(5))  # Output: 7
# A Python lambda has an implicit return. The single expression after : is automatically returned.