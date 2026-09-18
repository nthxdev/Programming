cel=float(input("Enter Celsius: "))
fah=float(input("Enter Fahrenheit: "))
choice=input("Enter Your choice: \n 1 for Celsius to Fahrenheit \n 2 for Fahrenheit to Celsius: ")
def cel_to_fah(c):
    print(f"Fahrenheit = {(c*9/5)+32:.2f}")
def fah_to_cel(f):
    print(f"Celsius = {(f-32)*5/9:.2f}")
match choice:
    case "1":
        cel_to_fah(cel)
    case "2":
        fah_to_cel(fah)
    case _:
        print("Enter valid choice.")

