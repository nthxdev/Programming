# declare -i num1 num2
# declare -i affects assignment; echo num1 + num2 will not work
while true; do
    read -p "Enter operator (q to quit): " op
    if [[ "$op" == "q" ]]; then
        break
    fi
    read -p "Enter num1 & num2: " num1 num2
    # spaces are mandatory.
    if [[ "$op" == "+" ]]; then
        echo $((num1 + num2))
    elif [[ "$op" == "-" ]]; then
        echo $((num1 - num2))
    elif [[ "$op" == "*" ]]; then
        echo $((num1 * num2))
    elif [[ "$op" == "/" ]]; then
        # Here Because (( )) is arithmetic evaluation mode, not string/text mode.
        # so $num2 also works, but unnecessary so
        if (( num2 == 0 )); then
            echo "cannot divide number by zero"
        else 
            echo $((num1 / num2))
        fi
    else 
        echo "Enter a valid operator"
    fi
done


