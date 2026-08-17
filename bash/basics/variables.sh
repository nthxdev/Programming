# char & string
var_str="Hello World"

# number
var_int="10"
var_int="10+20"
declare -i var_int2
var_int2="5"
var_float="5.5"
declare -i var_flaot2
var_float2="5.6"

# constants
readonly PI="3.14"
declare -r CONST="can't change"

# boolean (Bash has no boolean type)
# Commands return exit status:
# 0 = true (success)
# non-zero = false (failure)
true    # exits with status 0
echo $?
false   # exits with status 1
echo $?

# arrays
declare -a var_arr=(10 20 30 40)

# associative arrys
declare -A var_map
var_map=( ["name"]="something" ["age"]="20" )

# remove var from process env
var_rm=""
unset var_rm
echo $var_rm
