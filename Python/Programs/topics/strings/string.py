# find length of stringg
def string_length():
    string = input("Enter a string: ")
    length = 0
    for i in string:
        length += 1
    print(f"Length of the string is: {length}")

# Extract a substring from a string
def extract_substring():
    string = input("Enter a string: ")
    substring = string[2:5]
    print(f"Extracted substring: {substring}")

# Return the middle three characters of a string
def middle_three_characters():
    string = input("Enter a string: ")
    length = len(string)
    if length < 3:
        print("String is too short to extract middle three characters.")
    else:
        mid_index = length // 2
        middle_three = string[mid_index - 1: mid_index + 2]
        print(f"Middle three characters: {middle_three}")

# Reverse a string using a loop and slicing
def reverse_string():
    string = input("Enter a string: ")
    reversed_string = ""
    for i in range(len(string) - 1, -1, -1):
        reversed_string += string[i]
    print(f"Reversed string using loop: {reversed_string}")
    print(f"Reversed string using slicing: {string[::-1]}")

# Check whether a string is a palindrome
def is_palindrome():
    string = input("Enter a string: ")
    reverse_string = string[::-1]
    if string == reverse_string:
        print(f"{string} is a palindrome.")
    else:
        print(f"{string} is not a palindrome.")
    
# check string anagram
def check_anagram():
    str1, str2 = input("Enter two strings separated by a space: ").split()
    if sorted(str1) == sorted(str2):
        print(f"{str1} and {str2} are anagrams.")
    # or can use list to store each character 
    str1_list = []
    str2_list = []
    for char in str1:
        str1_list.append(char)
    for char in str2:
        str2_list.append(char)
    
