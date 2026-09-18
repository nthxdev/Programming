def sum_of_n_num():
    n=int(input("Enter N: "))
    sum=0
    if n == 0:
        print(f"sum is: 0")
    for i in range(1,n+1):
        sum += i
    print(f"sum is: {sum}")

