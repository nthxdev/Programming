while true; do
    read -p "Enter num1 num2 (or q to quit): " num1 num2
    [[ "$num1" == *q* || "$num2" == *q* ]] && break
    read -p "Enter operator: " op
    case "$op" in
        +) echo $((num1+num2));;
        -) echo $((num1 - num2)) ;;
        \*) echo $((num1 * num2)) ;;
        /)
            (( num2 == 0 )) && echo "Cannot Divide" || echo $(( num1 / num2 )) ;;
        *) echo "Invalid operator" ;;
    esac
done
