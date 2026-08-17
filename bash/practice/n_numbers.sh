#!/bin/bash
n_num() {
    read -p "Count from 1 to: " n
    for ((i=1; i<=n; i++)); do
        echo "$i"
    done
}
n_num