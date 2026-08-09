read -p "Enter a string: " str
vowel=0
constants=0
for (( i=0; i<${#str}; i++ )); do
    ch="${str:i:1}"
    ch="${ch,,}"
    if [[ $ch =~ [a-z] ]]; then
        if [[ $ch == [aeiou] ]]; then
            ((vowels++))
        else
            ((constants++))
        fi
    fi
done
echo "vowels:" $vowels
echo "constants:" $constants
