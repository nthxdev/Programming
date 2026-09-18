# A docstring is a function, class, or module's official documentation. Placed as the first statement.
# it explains -> what it does, parameters, returns, raises, and examples.
# Docstrings are accessible via the __doc__ attribute or help() function.
def add_numbers(a, b):
    """
    Adds two numbers and returns the result.

    Parameters:
    a (int or float): The first number.
    b (int or float): The second number.

    Returns:
    int or float: The sum of a and b.

    Example:
    >>> add_numbers(2, 3)
    5
    >>> add_numbers(2.5, 3.5)
    6.0
    """
    return a + b
print(add_numbers.__doc__)  # Accessing the docstring