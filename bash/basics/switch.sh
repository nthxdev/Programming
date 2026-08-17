read str
case "$str" in
    [a-zA-Z]*) echo "Letters" ;;
    [0-9]*)    echo "Numbers" ;;
    *)         echo "Special characters" ;;
esac