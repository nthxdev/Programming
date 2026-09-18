# In python much easier due to tuple packing/unpacking happens internally
"""
Packing
t = 1, 2, 3
This becomes: (1, 2, 3)

Unpacking
a, b, c = (1, 2, 3)
"""
a=int(input("Enter: "))
b=int(input("Enter: "))
print(f"Before swap -> {a,b}")
a,b=b,a
print(f"After swap -> {a,b}")


