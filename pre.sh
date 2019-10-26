#!/bin/sh
#sudo chmod +x ./pre.sh && ./pre.sh


docker pull devremoto/identity
docker pull devremoto/identity-admin

HOST_IP=localhost
HOST_PORT=4200

API_NAME=api1
API_PORT=52050

CLIENT_ID="tgappmodel"

STS_PORT=5000
STS_HTTPS_PORT=5001
STS_ADMIN_PORT=9000
STS_ADMIN_HTTPS_PORT=9001

USE_SSL=false
USE_AUTHORITY=true

HOST_SERVER=http://${HOST_IP}
HOST_URL=${HOST_SERVER}:${HOST_PORT}
API_SERVER=http://${HOST_IP}
API_URL=${API_SERVER}:${API_PORT}/api/


if ${USE_SSL} 
then
        STS_SERVER=https://${HOST_IP}:${STS_HTTPS_PORT}
else          
        STS_SERVER=http://${HOST_IP}:${STS_PORT}
fi