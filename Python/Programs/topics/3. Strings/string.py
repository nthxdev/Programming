# Note: Python strings use Unicode. ASCII is only a subset of Unicode, so the character-code exercise should distinguish `ord()`/`chr()` from ASCII-only validation
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

# Check Anagram
def anagram():
    str1 = input("Enter first word: ")
    str2 = input("Enter second word: ")
    if len(str1) != len(str2):
        print("Not anagrams")
    else:
        freq = {}
        for char in str1:
            if char in freq:
                freq[char] = freq[char] + 1
            else:
                freq[char] = 1
        for char in str2:
            if char not in freq:
                print("Not anagrams")
                break
            freq[char] = freq[char] - 1
            if freq[char] < 0:
                print("Not anagrams")
                break
        else:
            print("Anagrams")

# Count character frequencies
string = input("Enter a string: ")
freq = {}
for char in string:
    if char in freq:
        freq[char] = freq[char] + 1
    else:
        freq[char] = 1
print(freq)

# Count vowels and consonants
def vowel_constants():
    string = input("Enter a string: ")
    vowels = 0
    consonants = 0
    for char in string:
        if char == "a" or char == "e" or char == "i" or char == "o" or char == "u":
            vowels = vowels + 1
        elif (char >= "a" and char <= "z"):
            consonants = consonants + 1
    print("Vowels:", vowels)
    print("Consonants:", consonants)

# Count lowercase letters, uppercase letters, digits, and special characters
def count_letter_types():
    string = input("Enter a string: ")
    lowercase = 0
    uppercase = 0
    digits = 0
    special = 0
    for char in string:
        if char >= "a" and char <= "z":
            lowercase = lowercase + 1
        elif char >= "A" and char <= "Z":
            uppercase = uppercase + 1
        elif char >= "0" and char <= "9":
            digits = digits + 1
        else:
            special = special + 1
    print("Lowercase:", lowercase)
    print("Uppercase:", uppercase)
    print("Digits:", digits)
    print("Special characters:", special)

# Remove punctuation from a string
def remove_punctuation():
    string = input("Enter a string: ")
    result = ""
    for char in string:
        if (char >= "a" and char <= "z") or \
        (char >= "A" and char <= "Z") or \
        (char >= "0" and char <= "9") or \
        char == " ":
            result = result + char
    print(result)

# Sort characters by Unicode code point, with optional ASCII-specific handling
def sort_str():
    string = input("Enter a string: ")
    chars = ""
    for char in string:
        chars = chars + char
    n = len(chars)
    chars = list(chars)
    for i in range(n):
        for j in range(0, n - i - 1):
            if chars[j] > chars[j + 1]:
                temp = chars[j]
                chars[j] = chars[j + 1]
                chars[j + 1] = temp
    result = ""
    for char in chars:
        result = result + char
    print(result)

# Sort words alphabetically
def sort_str_alpha():
    string = input("Enter a sentence: ")
    words = {}
    word = ""
    count = 0
    for char in string:
        if char == " ":
            if word != "":
                words[count] = word
                count = count + 1
                word = ""
        else:
            word = word + char
    if word != "":
        words[count] = word
        count = count + 1
    for i in range(count):
        for j in range(i + 1, count):
            if words[i] > words[j]:
                temp = words[i]
                words[i] = words[j]
                words[j] = temp
    for i in range(count):
        print(words[i])


# Find the ASCII value of a character and convert a code back to a character
def find_ascii():
    string = input("Enter a string: ")
    start = 0
    end = len(string) - 1
    while start <= end and string[start] == " ":
        start = start + 1
    while end >= start and string[end] == " ":
        end = end - 1
    result = ""
    for i in range(start, end + 1):
        result = result + string[i]
    print(result)

# Program to display the ASCII value of a character
# Convert decimal number to biary using loops


def main():
    while True:
        show_menu()
        choice = input("Enter your choice: ").strip().lower()

        if choice == "q":
            print("Exiting...")
            break

        program=PROGRAMS.get(choice)
        if program is None:
            print("Invalid choice. Please select valid choice or q to quit.")
            continue
        try:
            program()
        except Exception as e:
            print(f"Program failed: {exc}")

if __name__ == "__main__":
    main()
+