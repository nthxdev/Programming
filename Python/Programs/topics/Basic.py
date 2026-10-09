# only display the menu once at very top when program start once
# clear command to clear terminal screen

def char_freq():
    str = input("Enter a string: ")
    freq={}
    for ch in str:
        if ch in freq:
            freq[ch] += 1
        else:
            freq[ch] = 1
    for ch in freq:
        print(ch,":",freq[ch])


def check_anagram():
    str1 = input("Enter first string: ")
    str2 = input("Enter second string: ")
    if len(str1) != len(str2):
        print("Not Anagram")
    else:
        freq = {}

        # Count characters in first string
        for ch in str1:
            if ch in freq:
                freq[ch] += 1
            else:
                freq[ch] = 1

        # Remove characters using second string
        for ch in str2:
            if ch not in freq:
                print("Not Anagram")
                break

            freq[ch] -= 1

            if freq[ch] < 0:
                print("Not Anagram")
                break
        else:
            # Runs only if the loop wasn't broken
            for value in freq.values():
                if value != 0:
                    print("Not Anagram")
                    break
            else:
                print("Anagram")

def count_vowels_constants():
    str = input("Enter a string: ")
    vowels=0
    constants=0
    for ch in str:
        if ch.isalpha():
            if ch in "aeiou":
                vowels += 1
            else:
                constants += 1
    print(f"In ur string: {str} \nvowels count: {vowels}\nconstants count: {constants}")


def word_frequency():
    str=input("Enter a string: ")
    freq={}
    for word in str.split():
        if word in freq:
            freq[word] += 1
        else:
            freq[word] = 1

    for word,count in freq.items():
        print(f"{word}: {count}")


PROGRAMS = {
    "1": add_two_numbers,
    "2": area_of_circle,
    "3": temperature_conversion,
    "4": char_freq,
    "5": check_anagram,
    "6": check_palindrome,
    "7": count_vowels_constants,
    "8": even_or_odd,
    "9": factorial_type,
    "10": fibonacci_type,
    "11": largest_of_three,
    "12": even_n_num,
    "13": n_num,
    "14": simple_calculator,
    "15": sum_of_n_num,
    "16": swap_two_variables,
    "17": word_frequency
}

def show_menu():
    print("1. Add two numbers")
    print("2. Area of circle")
    print("3. Temperature Conversion")
    print("4. Character Frequency")
    print("5. Check Anagram")
    print("6. Check Palindrome")
    print("7. Count Vowels and Constants")
    print("8. Even or Odd")
    print("9. Factorial")
    print("10. Fibonacci")
    print("11. Largest of Three")
    print("12. First N Even Numbers")
    print("13. Count from 1 to N")
    print("14. Simple Calculator")
    print("15. Sum of First N Numbers")
    print("16. Swap Two Variables")
    print("17. Word Frequency")
    print("Q(Quit). Exit")

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


