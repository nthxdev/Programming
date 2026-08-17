# A decorator is a function that wraps another function to extend its behavior without modifying its code.
# syntax:
@decorator
def func():
    pass
# python rewrites it to: func = decorator(func)

# Preserving original function metadata using @functools.wraps;
# when decorate a function - Original metadata is lost -> __name__, __doc__, __module__
# Solution: @functools.wraps
def decorator(func):
    @wraps(func)
    def wrapper():
        return func()
    return wrapper
@decorator
def greet():
    """Say hello"""
    print("Hello")

# variable arguments
def decorator(func):
    def wrapper(*args, **kwargs):
        print("Before")
        result = func(*args, **kwargs)
        print("After")
        return result
    return wrapper
# *args → collects all positional arguments into a tuple.
# **kwargs → collects all keyword arguments into a dictionary.

