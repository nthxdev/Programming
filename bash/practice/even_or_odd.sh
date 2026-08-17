read -r -p "Enter Number: " num
# In [[ ... ]], == is usually string comparison.
# In (( ... )), == is numeric equality.
if ((num % 2 -eq 0 ));then
    echo "${num} is even."
else
    echo "${num} is odd"
fi

