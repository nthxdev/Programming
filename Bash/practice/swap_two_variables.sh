var1="Hello"
var2="World"
swap(){
    local temp=""
    
    # pass by value
    # local a=$1 a=$2

    # pass by reference
    # if use va1 var2 instead of a b will get
    # warning: circular name reference
    # warning: maximum nameref depth exceeded
    local -n a=$1 b=$2

    echo "String before swap -> ${a},${b}"
    temp=$a
    a=$b
    b=$temp
    echo "String after swap -> ${a},${b}"
}

# pass by value
# swap $var1 $var2
# echo "Original var -> ${var1},${var2}"

# pass by reference
swap var1 var2
echo "referenced var changed -> ${var1},${var2}"
# we could also overwrite global variables to change them.