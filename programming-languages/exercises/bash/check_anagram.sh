read -p "Enter a string: " str1
read -p "Enter a string: " str2

if [[ ${#str1} -ne ${#str2} ]]; then
    echo "Not anagram"
    exit 
fi
declare -A freq
for (( i=0; i<${#str1}; i++ )); do
    ch="${str1:i:1}"
    (( freq[$ch]++ ))
done

for (( i=0; i<${#str2}; i++ )); do
    ch="${str2:i:1}"

    if [[ ! -v freq[$ch] ]]; then
        echo "Not Anagram"
        exit
    fi

    ((freq[$ch]--))

    if (( freq[$ch] < 0 )); then
        echo "not anagram"
        echo "pass5"
        exit
    fi
done
echo "anagram"