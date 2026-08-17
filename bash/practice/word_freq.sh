#!/bin/bash
read -p "Enter a string: " str
declare -A freq
for word in $str; do
    ((freq[$word]++))
done
for word in "${!freq[@]}"; do
    echo "$word: ${freq[$word]}"
done