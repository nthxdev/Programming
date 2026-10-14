# --- DISPOSALL VALUE ---
def meow(n: int) -> None:
# --- DOCSTRING ---
    """
    Meow n times.
    :param n: Number of times to meow
    :type n: int
    :raise TypeError: if n is not an int
    :return: A string of n meows, one per line
    :rtype: str
    """
    for _ in range(n):
        print("meow")
number: int = input("Number: ") # this will hint error on run
meows: str = meow(number)
