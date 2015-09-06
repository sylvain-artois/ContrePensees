#!/bin/sh

#From http://www.sitepoint.com/one-click-app-deployment-server-side-git-hooks/

## store the arguments given to the script
read oldrev newrev refname

## Where to store the log information about the updates
LOGFILE=./post-receive.log

# The deployed directory (the running site)
DEPLOYDIR=/srv/contrepensees.fr

##  Record the fact that the push has been received
echo -e "Received Push Request at $( date +%F )" >> $LOGFILE
echo " - Old SHA: $oldrev New SHA: $newrev Branch Name: $refname" >> $LOGFILE

## Update the deployed copy
echo "Starting Deploy" >> $LOGFILE

echo " - Starting code update"
GIT_WORK_TREE="$DEPLOYDIR" git checkout -f
echo " - Finished code update"

##Update node modules
echo " - Starting npm install"
cd "$DEPLOYDIR"
npm install;
echo " - Finished npm update"

##Update bower deps
echo " - Starting bower install"
cd "$DEPLOYDIR"
bower install;
echo " - Finished bower update"

cd -
echo "Finished Deploy" >> $LOGFILE