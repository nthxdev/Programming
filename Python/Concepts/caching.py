# Caching expensive calculations (use case)
# Caching means store a result so you don't recompute it.
from functools import cache
@cache
def square(x):
    print("Calculating...")
    return x * x
square(5)
square(5)
# @cache caches the entire function's return value, per unique arguments.
"""
-> first call - square(5)
5 in cache? → No
↓
Run whole function
↓
Store: {5: 25}
↓
Return 25

-> second call - square(5)
5 in cache? → Yes
↓
Return 25 immediately

-> so the cahce becomes:
{
    5: 25,
    10: 100,
}
"""
# @cache and @functools.lru_cache are built-in decorators that automatically memoize function results based on their arguments.