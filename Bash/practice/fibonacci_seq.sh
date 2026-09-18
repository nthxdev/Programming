#!/bin/bash

fibonacci() {
    local n=$1

    echo "Current n is: $n -->" >&2

    if (( n <= 1 )); then
        echo "$n"
        return
    fi

    local a b
    a=$(fibonacci $((n - 1)))
    b=$(fibonacci $((n - 2)))

    echo $((a + b))
}

loop_fib() {
    local n=$1
    local first=0
    local second=1
    local next

    for ((i=0; i<n; i++)); do
        echo -n "$first "
        next=$((first + second))
        first=$second
        second=$next
    done
    echo
}

read -p "Enter number: " num

echo "Fibonacci using loop:"
loop_fib "$num"

echo "Fibonacci using recursion:"
for ((i=0; i<num; i++)); do
    echo -n "$(fibonacci "$i") "
done
echo