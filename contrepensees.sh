#!/bin/bash

# description: contrepensees service
# processname: node
# pidfile: /var/run/contrepensees.pid
# logfile: /var/log/contrepensees.log
#
# Based on https://gist.github.com/jinze/3748766
# @see https://gist.github.com/operatino/8389370
#
# To use it as service on Ubuntu:
# cp contrepensees.sh /etc/init.d/contrepensees
# chmod a+x /etc/init.d/contrepensees
# update-rc.d contrepensees defaults
#
# Then use commands:
# service contrepensees <command (start|stop|etc)>
#
# Voir aussi https://www.exratione.com/2013/02/nodejs-and-forever-as-a-service-simple-upstart-and-init-scripts-for-ubuntu/
# Voir aussi https://www.terlici.com/2015/02/05/hosting-deploying-nodejs.html

NAME=contrepensees                       # Unique name for the application
SOURCE_DIR=/srv/contrepensees.fr         # Location of the application source
COMMAND=node                             # Command to run
SOURCE_NAME=keystone.js                  # Name os the applcation entry point script
USER=git                                 # User for process running
NODE_ENVIROMENT=production               # Node environment
UUID=contrepensees

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
    /bin/su - $USER  -c "export NODE_ENV=$NODE_ENVIROMENT && $forever start --pidFile $pidfile -l $logfile -a --sourceDir $SOURCE_DIR -c $COMMAND $SOURCE_NAME"

    RETVAL=$?
}

restart() {
    echo -n "Restarting $NAME node instance : "
    /bin/su - $USER  -c "$forever restart $SOURCE_NAME"
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

#if [ -f $PIDFILE ]; then
#        echo "Shutting down $NAME"
#        # Tell Forever to stop the process.
#        forever stop $APPLICATION_PATH 2>&1 > /dev/null
#        # Get rid of the pidfile, since Forever won't do that.
#        rm -f $PIDFILE
#        RETVAL=$?
#    else
#        echo "$NAME is not running."
#        RETVAL=0
#    fi
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
