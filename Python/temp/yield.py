# yield is a keyword that turns a function into a generator function.
# Instead of returning once and ending, it produces a value, pauses, and later resumes from the same place.
# def f():
#     yield 1
#     yield 2
# yield creates lazy, pause-and-resume generators that produce values one at a time instead of returning them all at once.
# Infinite Gnerator
# def counter():
#     n = 0
#     while True:
#         yield n
#         n += 1

# send() - used to send a value into a paused generator.

# yield from Delegate to another generator
# def sub():
#     yield 1
#     yield 2
# def main():
#     yield from sub()
#     yield 3

# close() - stops a generator used for clean up

# summary:
# [ ] → List (eager)
# ( ) → Generator (lazy)
# yield → Pause
# next() → Resume
# send() → Resume + send data
# yield from → Forward another generator
# close() → Stop generator