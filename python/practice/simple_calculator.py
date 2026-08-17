while true:
    inputs=input("Enter num1 num2 (or q to quit): ").split()
    if "q" in inputs:
        break
    op=input("Enter Operator: ")
    num_list=list(map(int, inputs))
    match op:
        case "+":
            print(num_list[0] + num_list[1])
        case "-":
            print(num_list[0] - num_list[1])
        case "*":
            print(num_list[0] * num_list[1])
        case "/":
            if num_list[1] == 0:
                print("Cannot divide by zero")
            else:
                print(num_list[0] / num_list[1])
        case _:
            print("Invalid operator")