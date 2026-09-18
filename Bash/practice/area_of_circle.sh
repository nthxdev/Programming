# Area of Circle πr^2
read -r -p "Enter Area of Circle: " radius
# readonly
declare -r PI=3.14
area_of_circle() { 
    echo "$PI * $1^2" | bc
}
area_of_circle $radius
