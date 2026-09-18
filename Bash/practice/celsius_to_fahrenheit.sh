read -r -p $'Enter Your choice: \n 1 for Celsius to Fahrenheit \n 2 for Fahrenheit to Celsius: ' choice
read -r -p "Enter Celsius and Fahrenheit: " cel fah
cel_to_fah(){
    fah=$(echo "scale=1; $cel * 9/5 + 32" | bc )
    printf "Celsius %.1f -> Fahrenheit %.1f\n" "$cel" "$fah"
}
fah_to_cel(){
    cel=$(echo "scale=1; ($fah - 32) * 5/9" \ bc)
    printf "Fahrenheit %.1f -> Celsius %.1f\n" "$fah" "$cel"
}
case "$choice" in
    1)
    cel_to_fah $cel
    ;;
    2)
    fah_to_cel $fah
    ;;
    *)
    echo "plz enter valid value between 1 & 2"
    ;;
esac
