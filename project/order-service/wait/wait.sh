#!/usr/bin/env bash
S=0

while [ $S -ne 200 ]
do

S=$(curl -s -o /dev/null -w "%{http_code}"  $1 )

sleep 1 

done ;

echo "DONE !!"

#write the script to start the service 
