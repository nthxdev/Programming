read -p "Enter a string: " str
declare -A freq
for ((i=0;i<${#str};i++)); do
    ch="${str:i:1}"
    ((freq["$ch"] += 1))
done
echo "character frequency: ";

for ch in "${!freq[@]}"; do
    echo "$ch: ${freq[$ch]}"
done
