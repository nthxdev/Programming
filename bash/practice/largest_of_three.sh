declare -a num_arr=()
echo "Enter Numbers: "
# read -r num_arr[0] num_arr[1] num_arr[2]
# much better grow and multiple input
read -r -a num_arr
max=${num_arr[0]}
min=${num_arr[0]}
for n in "${num_arr[@]}"; do
    ((n > max)) && max=$n
    ((n < min)) && min=$n
done
printf "Largest number is %d\nSmallest number is %d\n" "$max" "$min"
