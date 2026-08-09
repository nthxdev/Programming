read -p "enter ur distro: " linux
if [[ $linux == *ub* ]]; then
    echo "Distro: $linux"
    read -p "Username: " name
    if [[ $name == $USER ]]; then
    echo "Action: $action"
    read -p "what action to perfrom (update or system info): " action
        if [[ $action == "update" ]]; then
            echo $(sudo apt update && sudo apt upgrade -y)
        elif [[ $action == *sys* ]]; then
            echo $(cat /etc/os-release)
            echo $( grep -i microsoft /proc/version )
            echo $( uname -a )
            echo $( hostname )
            echo $( id )
            echo $( whoami )
            echo $( pwd )
            echo $( date )
            echo $( uptime )
            echo $( getconf LONG_BIT )
            echo $( getconf _NPROCESSORS_ONLN )
        else
            echo "no action performed"
        fi
    else
        echo "not a USER"
    fi
else
    echo "$linux not supported"
fi

read -p "Age: " age
[[ age -ge 18 ]] && valid="allowed" || valid="not allowed"
echo "permission: $valid"