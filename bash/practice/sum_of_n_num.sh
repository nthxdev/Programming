#!/bin/bash
sum_of_n_num() {
    read -p "Enter N: " n
    sum=0
    if (( n == 0 )); then
        echo "Sum is: 0"
        return
    fi
    for ((i=1; i<=n; i++)); do
        ((sum += i))
    done
    echo "Sum is: $sum"
}
sum_of_n_num