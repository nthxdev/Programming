# for arithmatic $(())
# for strings evalution [[ ]]
(( math=2+2*4/(2*1)))
echo $math
# unary: only works on variables
# (( x++ ))
# (( ++x ))


# (( )) → evaluate
# $(( )) → expand
declare -i num1 num2
num1=1
num2=2
# arithmatic -> + - * / % ** ++  --
echo $(( ++num2 ))
echo $(( --num2 ))
# assignment -> =   +=  -=  *=  /=  %=  **=

# comparsion -> <   >   <=  >=  ==  !=
((num1 > num2 ))
echo "False: $?"
((num1 < num2 ))
echo "True: $?"

# logical -> &&  ||  !
(( 5 > 3 && 2 < 4 )) 
echo "result: ${?}"

# Bitwise
# &   Bitwise AND: 1 only if both bits are 1.
# |   Bitwise OR: 1 if either bit is 1.
# ^   Bitwise XOR: 1 if bits differ.
# ~   Bitwise NOT: flips every bit.
# <<  Left shift: shifts bits left (×2 per shift).
# >>  Right shift: shifts bits right (÷2 per shift for positives).

# =====================================
# inside [[...]]
str1="hello"
str2="world"

# string comparsion -> ==   !=  <    >  =~ (for regex)
[[ "apple" < "banana" ]]     # lexicographically before
[[ "cat" > "apple" ]]        # lexicographically after

# for numeric in [[ ]]
# -eq -> equal to
# -ne -> not equal to
# -lt -> less than
# -gt -> greater than
# -le -> less than equal
# -ge -> greater than equal

# logical - && , || , !

