#!/bin/bash


# description: contrepensees service
# processname: node
# pidfile: /var/run/contrepensees.pid
# logfile: /var/log/contrepensees.log
#
# Based on https://gist.github.com/jinze/3748766
#
# To use it as service on Ubuntu:
# sudo cp contrepensees.sh /etc/init.d/contrepensees
# sudo chmod a+x /etc/init.d/contrepensees
# sudo update-rc.d contrepensees defaults
#
# Then use commands:
# service contrepensees <command (start|stop|etc)>

NAME=contrepensees                       # Unique name for the application
SOUREC_DIR=/srv/contrepensees.fr         # Location of the application source
COMMAND=node                             # Command to run
SOURCE_NAME=keystone.js                  # Name os the applcation entry point script
USER=git                                 # User for process running
NODE_ENVIROMENT=production               # Node environment

pidfile=/var/run/$NAME.pid
logfile=/var/log/$NAME.log
forever=forever

start() {
    export NODE_ENV=$NODE_ENVIROMENT
    echo "Starting $NAME node instance : "

    touch $logfile
    chown $USER $logfile

    touch $pidfile
    chown $USER $pidfile

    #iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
    /bin/su - $USER  -c "$forever start --pidFile $pidfile -l $logfile -a --sourceDir $SOUREC_DIR -c $COMMAND $SOURCE_NAME"

    RETVAL=$?
}

restart() {
    echo -n "Restarting $NAME node instance : "
    /bin/su - $USER  -c "$USER $forever restart $SOURCE_NAME"
    RETVAL=$?
}

status() {
    echo "Status for $NAME:"
    /bin/su - $USER  -c "$forever list"
    RETVAL=$?
}

stop() {
    echo -n "Shutting down $NAME node instance : "
    /bin/su - $USER  -c "$forever stop $SOURCE_NAME"
}

case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    status)
        status
        ;;
    restart)
        restart
        ;;
    *)
        echo "Usage:  {start|stop|status|restart}"
        exit 1
        ;;
esac
exit $RETVAL
