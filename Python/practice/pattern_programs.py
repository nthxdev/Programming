# My attempt
# def triangle_of_num():
#     n = int(input("Enter number: "))
#     n_list = []
#     for i in range(1, n + 1):
#         n_list.append(i)
#         # print(n_list) 
#         print(*n_list)
# Unpacking - The * takes the list and passes each element as a separate argument to print().
# much better way
def triangle_of_num():
    n = int(input("Enter number: "))
    for i in range(1,n+1):
        for j in range(1,i+1):
            print(j,end=" ")
        print()
def diamond_shape():
    n = int(input("Enter number of rows: "))
    # Upper half
    for i in range(1, n + 1):
        print(" " * (n - i) + "* " * i)
        # print(" " * (n - i) + "*" * (2 * i - 1))
    # Lower half
    for i in range(n - 1, 0, -1):
    # remeber - for (int i = start; i > stop; i += step)
        print(" " * (n - i) + "* " * i)
    #     print(" " * (n - i) + "*" * (2 * i - 1))


def pyramid_of_stars():
    n = int(input("Enter number of rows: "))
    for i in range(1, n + 1):
        print(" " * (n - i) + "* " * i)

def hollow_square():
    n = int(input("Enter size: "))

    for i in range(n):
        for j in range(n):
            if i == 0 or i == n - 1 or j == 0 or j == n - 1:
                print("*", end=" ")
            else:
                print(" ", end=" ")
        print()

def main():
    while True:
        choice=input(
            """
            Enter Your choice (or q to quit):
            1. Triangle of numbers
            2. Diamond shape
            3. Hollow square
            4. Pyramid with stars
            """
        )
        if "q" in choice:
            break
        
        match choice:
            case "1":
                triangle_of_num()
            case "2":
                diamond_shape()
            case "3":
                hollow_square()
            case "4":
                pyramid_of_stars()
            case _:
                print("ente valid choice")
if __name__ == "__main__":
    main()