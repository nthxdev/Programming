global_var="global"
name(){
    read name
    echo "ur $name"
    return 0
}

pass_by_val(){
    local local_var="$1"
    local_var="u are still global but outside this functions"
    echo "i should be global: $local_var"
}
pass_by_ref(){
    # refering to the passed variable
    declare -n local_var="$1"
    local_var="u are'not global now"
    echo "i should be global: $local_var"
}
# argument passing
# pass by value
pass_by_val global_var
echo "global_Var value: $global_var"

pass_by_ref global_var
echo "global_Var value: $global_var"

# bash variables
# Positional parameters
# $0      Script name
# $1-$9   First to ninth arguments
# ${10}   Tenth argument (use braces for 10+)
# ${11}   Eleventh argument
# ...
# ${40}   Fortieth argument
# ...
# ${N}    Nth argument (unlimited, as many as passed)


# Special parameters
# $#      Number of arguments
# $@      All arguments (preserves each argument when quoted)
# $*      All arguments (joins into one string when quoted)
# $?      Exit status of last command
# $$      Current shell PID
# $!      PID of last background process
# $-      Current shell options
# $_      Last argument of previous command


# Bash-specific
# $BASH_VERSION   Bash version
# $BASH           Path to Bash executable
# $BASHPID        Current Bash process PID
# $PPID           Parent process PID
# $PWD            Current working directory
# $OLDPWD         Previous working directory
# $RANDOM         Random number (0-32767)
# $SECONDS        Seconds since shell started
# $LINENO         Current line number
# $FUNCNAME       Current function name
# $HOSTNAME       System hostname
# $HOSTTYPE       Machine type
# $OSTYPE         Operating system type
# $UID            Current user ID
# $EUID           Effective user ID
# $SHLVL          Shell nesting level
# $IFS            Internal Field Separator
# $PATH           Executable search path
# $HOME           Home directory
# $USER           Current username
# $SHELL          User's login shell
