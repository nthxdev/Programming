# File test operators
: << 'EOF'
-e   exists
-f   regular file
-d   directory
-L   symbolic link
-h   symbolic link
-s   non-empty file
-r   readable
-w   writable
-x   executable
-O   owned by user
-G   owned by group

-b   block device
-c   character device
-p   named pipe
-S   socket

-N   modified since last read
-t   terminal fd

-nt  newer than
-ot  older than
-ef  same file
EOF

# variable tests
: << 'EOF'
-z   string is empty
-n   string is not empty
-v   variable exists (Bash)
-R   variable is name reference
EOF

# pattern mathcing:
: << 'EOF'
* - any num of characters (including none e.g file*.txt -> file1.txt and file.txt are vlaid match)
? - exactly one character
[...] - each one character from set
braces expansion -> {...} generates mutliple strings
EOF

# Shell Command operators
: << 'EOF'
;    command separator
&    background
&&   AND
||   OR
|    pipe
|&   pipe stdout+stderr

()   subshell
{}   command group
EOF

# Redirection
: << 'EOF'
>    overwrite
>>   append
<    input

<>   read/write

<<   here-document
<<<  here-string

2>
2>>
2>&1
&>
&>>

<&
>&
EOF

# parameter expansion operators
: << 'EOF'
${var}

${#var}

${var:-default}
${var:=default}
${var:+value}
${var:?error}

${var#pattern}
${var##pattern}

${var%pattern}
${var%%pattern}

${var/pat/repl}
${var//pat/repl}

${var^}
${var^^}
${var,}
${var,,}

${var:offset}
${var:offset:length}

${!var}
${!prefix*}
${!prefix@}
EOF

# Array operators
: << 'EOF'
${arr[index]}
${arr[@]}
${arr[*]}
${#arr[@]}
${!arr[@]}
EOF

# process substitution
: << 'EOF'
<(command)
>(command)
EOF

# Comma ,
echo $(( x=1, y=2, x+y ))   # 3

# Ternary
# condition ? on_true : on_false
echo $(( 5 > 3 ? 10 : 20 )) # 10
