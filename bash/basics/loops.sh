declare -i i=0
# loop while the condition is true.
while true; do
    if [[ $i -eq 3 ]]; then
        break
    fi
    echo $i
    ((i++))
done 
echo "while print from 0 to 2 current value of i: " $i

# until the condition becomes true
until false; do
    if [[ $i -eq 10 ]]; then
        break
    fi
    echo $i
    (( i++ ))
done
echo "while print from 3 to 9 current value of i: " $i
# for loop
for ((i=0; i<5; i++ )); do 
    echo $i
done

# for iterating over a sequence
for elem in "elem1" "elem2" "elem3"; do
    echo "current elem :" $elem
done