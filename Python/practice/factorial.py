def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n-1)

def loop_factorial(n):
    result=1
    if n <= 1:
        return 1
    for i in range(1,n+1):
        result *= i
    return result  

def main():
    num=int(input("Enter Number for:"))
    print(f"factorial using recursion: {factorial(num)}")
    print(f"factorial using loop: {loop_factorial(num)}")
if __name__ == "__main__":
    main()