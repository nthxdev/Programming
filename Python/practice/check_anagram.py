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



            