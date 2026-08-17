#!/bin/bash
factorial() {
    local n=$1
    if (( n <= 1 )); then
        echo 1
        return
    fi
    local prev
    prev=$(factorial $((n - 1)))
    echo $((n * prev))
}
loop_factorial() {
    local n=$1
    local result=1
    if (( n <= 1 )); then
        echo 1
        return
    fi
    for ((i=1; i<=n; i++)); do
        ((result *= i))
    done
    echo "$result"
}

main() {
    read -p "Enter Number: " num
    echo "Factorial using recursion: $(factorial "$num")"
    echo "Factorial using loop: $(loop_factorial "$num")"
}
main