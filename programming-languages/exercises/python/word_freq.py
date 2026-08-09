str=input("Enter a string: ")
freq={}
for word in str.split():
    if word in freq:
        freq[word] += 1
    else:
        freq[word] = 1

for word,count in freq.items():
    print(f"{word}: {count}")