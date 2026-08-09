#!/bin/bash

triangle_of_num() {
    read -p "Enter number: " n

    for ((i=1; i<=n; i++)); do
        for ((j=1; j<=i; j++)); do
            echo -n "$j "
        done
        echo
    done
}

diamond_shape() {
    read -p "Enter number of rows: " n

    for ((i=1; i<=n; i++)); do
        printf "%*s" $((n-i)) ""
        for ((j=1; j<=i; j++)); do
            echo -n "* "
        done
        echo
    done

    for ((i=n-1; i>=1; i--)); do
        printf "%*s" $((n-i)) ""
        for ((j=1; j<=i; j++)); do
            echo -n "* "
        done
        echo
    done
}

pyramid_of_stars() {
    read -p "Enter number of rows: " n

    for ((i=1; i<=n; i++)); do
        printf "%*s" $((n-i)) ""
        for ((j=1; j<=i; j++)); do
            echo -n "* "
        done
        echo
    done
}

hollow_square() {
    read -p "Enter size: " n

    for ((i=0; i<n; i++)); do
        for ((j=0; j<n; j++)); do
            if (( i == 0 || i == n-1 || j == 0 || j == n-1 )); then
                echo -n "* "
            else
                echo -n "  "
            fi
        done
        echo
    done
}

while true; do
    read -p "
Enter your choice:
1. Triangle of numbers
2. Diamond shape
3. Hollow square
4. Pyramid with stars
q. Quit
" choice

    case "$choice" in
        1) triangle_of_num ;;
        2) diamond_shape ;;
        3) hollow_square ;;
        4) pyramid_of_stars ;;
        q) break ;;
        *) echo "Enter valid choice" ;;
    esac
done