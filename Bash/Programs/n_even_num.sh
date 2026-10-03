#!/bin/bash
even_n_num() {
    read -p "Enter first ___ even numbers: " n
    echo "First $n even numbers:"
    for ((i=0; i<n; i++)); do
        echo $((2 * i))
    done
}
even_n_num