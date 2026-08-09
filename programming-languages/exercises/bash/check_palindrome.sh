read -p "enter a string: " str
rev=""
for ((i=${#str}-1; i>=0; i--)); do
    rev+="${str:i:1}"
done
if [[ ${str} != ${rev} ]]; then
    echo "not palindrome"
else
    echo "palindrome"
fi