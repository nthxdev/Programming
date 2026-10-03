# multiple integer inputs
# num_list=list(map(int,input("Enter numbers: ").split()))
# max_num=num_list[0]
# min_num=num_list[0]
# for i in num_list:
#     if i > max_num:
#         max_num=i
#     if i < min_num:
#         min_num=i
# print(f"Largest number is {max_num}\nSmallest number is {min_num}\n")

# much better
num_list = list(map(int, input("Enter numbers: ").split()))
print("Largest:", max(num_list))
print("Smallest:", min(num_list))