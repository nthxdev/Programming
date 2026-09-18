# Add two Numbers
declare -i  num1 num2 sum
read -p "Enter num1: " num1
read -p "Enter num2: " num2
# arithmetic expansion.
# sum=$((num1+num2)) but coz we used declare -i we can:
sum=num1+num2
echo -e "sum of ${num1} and ${num2} is ${sum}\n"
