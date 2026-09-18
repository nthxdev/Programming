# everything is string so parsing is jut treating string differently based on context
# (arithmetic context vs string context).

var="25"
echo "var=$var is a string still 25 + 1 = $(( var_int = var + 1))"
string="$var_int"
echo $string


