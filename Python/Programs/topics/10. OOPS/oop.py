# Classes, iterators, generators, enums
# Inheritance, composition
#  Magic Methods 
# composition
# get_student(): -> return {"name": name, "house": house}
# student = get_student()
# -- OOPS IS BETTER HERE ---
# --- OOPS ---
# class Student:
    # def __init__(self, name, house):
        # if not name: --- idk
            # sys.exit("Missing Name")
        # self.name = name
        # self.house = house
        # --- OTHER WAY ---
        # if not name:
        #     raise ValueError("Missing Name")
        # if house not in ["Gryffindor",  "house2"]:
        #     raise valueError("Invalid House")
        # self.name = name
    # --- __str__ ---
    # def __str__(self):
        # return f"{self.name}" from {self.house}"
    # def charm(self):
    #     match self.patronus:
    #         case "Stag":
    #             return "emoji"
    #         case _:
    #             return "/"


# --- DECORATORS ---
# --- @property ---
# @property
# def house(self):
#     return self.house
# @house.setter
# def house(self, house):
#     if house not in ["string1", "string2"]:
#         raise ValueError("Invalid House")
#     self._house = house # clever way of python dont deny access just change its name but doesn't stop from access
# @property
# def name(self):
#     return self._name
# @name.setter

# @classmethod
# def sort(cls, name): # cls is python choosen word
    # print(name, "is in", random.choice(self.houses))
# --- other ---
# def get(cls):
    # name=input("Name" :)
    # house=input("House: ")
    # return cls(name, house)

# --- INHERITANCE ---
# class Professor(Wizard):
#     def __init__(self, name, subject):
#         super().__init(name)
#         self.subject=subject
# & yes constructor params can be default or other 
# instance methods

# --- overriding ---
# object.__add___(self, other):
# overriding can we define new operator in python 


# @property
#     def balance(self):
#         return self._balance
#     def deposit(self, n):
#         self._balance += n
#     def withdraw(self, n):
#         self._balance -= n

# --- OVERLAODING ---
# class Point:
#     def __init__(self, x, y):
#         self.x = x
#         self.y = y
#     def __add__(self, other):
#         return Point(self.x + other.x, self.y + other.y)
#     def __str__(self):
#         return f"({self.x}, {self.y})"
# p1 = Point(2,3)
# p2 = Point(4,5)
# p3 = p1 + p2
# --- COMMON OPERATOR OVERLOADING METHODS ---
# + __add__()
# - __sub__()
# * __mul__()
# / __truediv__()
# // __floordiv__()
# % __mod__()
# == __eq__()
# < __lt__()
# > __gt__()
# <= __le__()
# >= __ge__()
# != __ne__()



# Python language features and OOP
# -> For area calculation, use one class or a shared interface for different shapes rather than assuming Python supports Java-style method overloading by parameter type.


# Define classes and create objects
# Implement method overloading alternatives in Python
# Use inheritance and method overriding
# Use generators and the `yield` keyword
# Implement iterators and the iterator protocol
# Use anonymous functions (`lambda`)
# Explore decorators and higher-order functions
# Compare `type()` and `isinstance()`
# Use `enum.Enum` for named constants
# Explore regular expressions (`re`) for pattern matching
# python program to chek if a string has all unique characters
# program to remove all duplicates character from a string
# script to count the frequency of each char in stirng 
# program to accept a sentence and calculates the number of upper and lower case letters
# program to find the longest word in a sentence 
# program that takes string and returns the string in reverse orer without usng [::-1]
# program to check string is pangram
# script to sort words in a sentence alphabetically
# program to check two string are anagrams
# program to capitalize the first letter of each word in sentence
# program that extracts numbers from a string and returns their sum
# program to replace all spaces in string with underscores
# function to count how many times a substring appears in a stirng
# program to convert a string into tittle case without using .title()
# program to merge two dictionaries into one 
# program to filter out all non-alphabetic character from a stirng
# function that returns true if a string ends with given suffix 
# program that counts words, characters, and lines in a paragraph
# script to encode a string using Caesar cipher(shift = 3)
# program that accepts a string and counts vowels and consonants
# script to convert binary string to decimal
# program to count the number of words starting with a vowel in a string
# script program that takes a sentence and remvoes all stop words
# program to split a sentence into words and reverse each word
# function that returns a new strig made of every third character of the original strig
# program to find all palindromic substring in a stirng
# function that compresses a stirng using run-length encoding
# program to count the frequency of each word in a file
# script that extracts hashtags from a tweet
# function to remove punctuation from a string
# program that finds the first non-repeating character in a stirng
# script that converts camelCase to snake_case
# function to generate acronyms from a sentence
# script to check if a file contains a specific word
# program ot find and replace text in a file
# script that checks if all characters in a strings are digits 
# program to calculate the average word length in a sentence
# function that rmeoves all HTML tags from a string
# program to parse a date stirng and display it in a different format
# script that finds all email addresses in a given text
# program that counts the occurence of each vowel in a paragraph
# function that validates an email adress format
# script to check if  a stirng is valid URL
# program that extracts all integers from a given text
# script to find duplicate words in paragraph
# program that converts a sentence to Pig Latin
# script that finds the longest senetence in a paragraph
# program to read a file and display all lines that contain a given keyword
# script to clean a text file by removing extra spaces and blank lines
# program to count how many sentences are in paragraph
