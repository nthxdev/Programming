str=input("enter a string: ").lower()
vowels=0
constants=0
for ch in str:
    if ch.isalpha():
        if ch in "aeiou":
            vowels += 1
        else:
            constants += 1
print(f"In ur string: {str} \nvowels count: {vowels}\nconstants count: {constants}")