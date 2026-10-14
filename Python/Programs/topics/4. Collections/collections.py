import random

# Get Random element from list
def random_elem():
    li = input("Enter Elements for list: ").split()
    val = random.choice(li)
    print(val)

# Count occurence of each character
def count_occurence():
    li = input("Enter Elements for list: ").split()
    dic = {}
    for char in li:
        dic[char] += 1


# find last element of list
def last_elem_of_list():
    li = list(map(int, input("Enter Elements for list: ").split()))
    print(li[:-2:-1])

# Check whether a list is empty
def check_list_empty():
    li = list(map(int, input("Enter Elements for list: ").split()))
    if not li or len(li) == 0:
        print(f"List is not empty {li}")
    else:
        print(f"List is empty.")

# Find index & value of list
def index_val_():
    li = list(map(int, input("Enter Elements for list: ").split()))
    for index, value in enumerate(li):
        print(index, value)

# separate Even and odd element from list
def even_odd_list():
    li = list(map(int, input("Enter Elements for list: ").split()))
    even_li = []
    odd_li = []
    for val in li:
        if val % 2 == 0:
            even_li.append(val)
        else:
            odd_li.append(val)
    print(f"even list {even_li} \nodd list {odd_li}")

# Slice a list Concatenate two lists
def concate_list():
    li = list(map(int, input("Enter Elements for list: ").split()))
    li1 = li[:5]
    li2 = li[5:]
    print(f"Before concate {li1} {li2}")
    nest_li = [li1, li2]
    print(nest_li)
    for i in li2:
        li1.append(i)
    print(f"After Concate: {li1}")
    # sort the list
    li1.sort()
    print(f"After Sort: {li1}")


# Find the sum and average of list elements 
def sum_avg_list():
    li = input("Enter a list: ").split()
    sum = 0
    for num in li:
        if num >= "0" and num <= "9":
            sum += int(num)
        else:
            print("Only numbers are allowed")
            break
    else:
        size = len(li)
        print(f"Sum of {li} = {sum}")
        print(f"Average is = {sum / size}")


# Get unique elements from list
def get_unique_elem():
    li = list(map(int, input("Enter Elements for list: ").split()))
    unique = []
    for i in li:
        if i not in unique:
            unique.append(i)
    print(unique)

# square elements of an list 
def square_elem():
    li = list(map(int, input("Enter Elements for list: ").split()))
    # li = list(map(lambda x: x**2, li))
    # Simpler way:
    li = [x**2 for x in li]
    print(li)

# make list of random numbers from a range
def random_num():
    li = []
    n = input("Enter Number of random num: ")
    for i in range(5):
        num = random.randint(1, 100)
        li.append(num)
    print(li)

# Use list comprehensions to filter, transform, and create lists
def list_even_transform():
    li = list(map(int, input("Enter Elements for list: ").split()))
    square_list = [x**2 for x in li]
    filter_list = [x for x in li if x % 2 == 0]
    # square only even nums
    square_even_li = [x**2 for x in li if x % 2 == 0]
    print(f"Org list = {li}\nSquare list = {square_list}\nFilter List = {filter_list}\nSquare Even List = {square_even_li}")

# Create a dictionary from user input
def user_input_dict():
    d = {}
    n = int(input("How many entries? "))
    for i in range(n):
        key = input("Enter key: ")
        value = input("Enter value: ")
        d[key] = value
    print(d)

# Combine or merge two dictionaries
def merge_dict():
    dict1 = { "Name": name, "Last": lastname }
    dict2 = { "Age": 18, "DOB": "24-08-2005" }
    # d1.update(d2)
    merged = {}
    for key in d1:
        merged[key] = d1[key]
    for key in d2:
        merged[key] = d2[key]
    print(merged)    

# Check whether a key exists
def check_key_exists():
    dict1 = { "Name": name, "Last": lastname }
    key = input("Enter valid key name: ")
    if key in dict1:
        print("Key Exists")
    else:
        print("Key don't Exists")

# Sum all dictionary values
def sum_dict():
    d = {"a": 10, "b": 20, "c": 30}
    total = 0
    for value in d.values():
        total += value
    # total = 0
    # for key in d:
    #     total += d[key]
    print(total)    

# Iterate over dictionary keys, values, and key-value pairs
def iterate_dict():
    d = {"a": 10, "b": 20, "c": 30}
    for key, value in enumerate(d):
        print(f"{value}: {d[value]}")
# Convert two lists into a dictionary
def list_to_dict():
    keys = ["name", "age", "city"]
    values = ["Nitin", 23, "Agra"]
    d = {}
    for i in range(len(keys)):
        d[keys[i]] = values[i]
    print(d)

# sort a list
li = [5, 2, 8, 1, 3]
for i in range(len(li)):
    for j in range(len(li) - 1 - i):
        if li[j] > li[j + 1]:
            li[j], li[j + 1] = li[j + 1], li[j]
print(li)

# Convert a list of tuples into a dictionary
def dict_from_tuple_list():
    li = [("a", 1), ("b", 2), ("c", 3)]
    # d = dict(li)
    # print(d)
    # without dict()
    d = {}
    for key, value in li:
        d[key] = value
    print(d)

# Sort a dictionary by value
def sort_dict():
    d = {"a": 30, "b": 10, "c": 20}
    items = list(d.items())
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j][1] > items[j + 1][1]:
                items[j], items[j + 1] = items[j + 1], items[j]
    result = {}
    for key, value in items:
        result[key] = value
    print(result)

# Perform set operations: union, intersection, difference, and symmetric difference
# Python Operators have different meanings depending on the data type - 5 | 3(bitwise), {1, 2} | {2, 3}(Union on set)
def set_operation():
    set1 = {1, 2, 3, 4}
    set2 = {3, 4, 5, 6}
    # Union
    union = set1 | set2
    # Intersection
    intersection = set1 & set2
    # Difference
    difference = set1 - set2
    # Symmetric difference
    symmetric_difference = set1 ^ set2
    print("Union:", union)
    print("Intersection:", intersection)
    print("Difference:", difference)
    print("Symmetric Difference:", symmetric_difference)

# program that removes duplicates from a list
# function to reverse a list
# create tuple and access it element
# convert list to tuple and vice versa
# merge dictionaries
# safly check key or val in collection
# function to find common elem in two lists
# function to capitalize the first letter of each word in a string
# create dict and iterate over it keys values
# write a function to flatten a nested list
# nested dictionary to represent student records
# write function to rotate a list left by K positions
# write function to find missing number from a list of 1 to N
# program to remove all None values from a list
# write a function to merge two dictionaries and handle key collisions by summing values
# create a function to find unique elements present in only one of two lists
