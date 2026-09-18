# some terminologies
# Pure Function : Same input → same output, No side effects
def add(a, b):
    return a + b
# Impure Function : Changes outside state or depends on it.Nhas side effects.
count = 0
def inc():
    global count
    count += 1

    