def fibonacci(n):
    print(f"Current n is: {n} --> ")
    if n<=1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
def loop_fib(n):
    first=0
    second=1
    for _ in range(n):
        print(first, end=" ")
        next=first+second
        first=second
        second=next
    print(" ")
num=int(input("Enter number: "))
print(f"Fibonacci using loop:")
loop_fib(num)
print(f"Fibonacci using recursion:")
for i in range(num):
    print(fibonacci(i), end=" ")
print(" ")