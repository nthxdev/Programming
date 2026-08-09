str=input("Enter a string: ")
freq={}
for ch in str:
    if ch in freq:
        freq[ch] += 1
    else:
        freq[ch] = 1
for ch in freq:
    print(ch,":",freq[ch])    