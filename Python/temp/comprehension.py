# Comprehensions are a short way to create collections using loops.
# Syntax: [expression for item in iterable]
# [expression for item in iterable if condition]

# List Comprehension
num = [i for i in range(10)] 

# set comprehension
num_set = {i for i in range(10)}

# dict comprehension
num_dict = {i: i*i for i in range(10)}
# for dictionary use this: 
# for key, value in dictionary.items():
#     print(key, value)
# for i, item in enumerate(list):
#     print(i, item)

# tuple comprehension (actually a generator expression)
# use tuple() immediately consumes all of gnerator's values and returns a tuple
num_tuple = tuple(x for x in range(10))

# matrix comprehension
# matrix = [[x for x in range(3)] for y in range(3)]

# Lazy Version: Generator Expression
# Create a generator; produce values only when asked.
nums = (x*x for x in range(5))
print(nums) # <generator object <genexpr> at 0x75639ee0e810>
print(next(nums))
print(next(nums))
print(type(nums)) # generator

