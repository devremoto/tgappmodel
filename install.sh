#!/bin/sh
#sudo chmod +x ./install.sh && ./install.sh

sudo chmod +x ./cert.sh
./cert.sh

sudo chmod +x ./env-local.sh
./env-local.sh

# docker tag devremoto/tgappmodel/front devremoto/tgappmodel-front
# docker push devremoto/tgappmodel-front

# docker tag devremoto/tgappmodel/api devremoto/tgappmodel-api
# docker push devremoto/tgappmodel-api

# docker tag devremoto/identity devremoto/identity
# docker push devremoto/identity

# docker tag devremoto/identity/admin devremoto/identity-admin
# docker push devremoto/identity-admin

docker pull devremoto/identity
docker pull devremoto/identity-admin

HOST_IP=192.168.0.5
HOST_PORT=4200

API_NAME=api1
API_PORT=52050

CLIENT_ID="tgappmodel"

STS_PORT=5000
STS_HTTPS_PORT=5001
STS_ADMIN_PORT=9000
STS_ADMIN_HTTPS_PORT=9001

USE_SSL=true

HOST_SERVER=http://${HOST_IP}
HOST_URL=${HOST_SERVER}:${HOST_PORT}
API_SERVER=http://${HOST_IP}
API_URL=${API_SERVER}:${API_PORT}/api/


if ${USE_SSL} 
then
        PROTOCOL=https
        STS_SERVER=${PROTOCOL}://${HOST_IP}:${STS_HTTPS_PORT}
        STS_ADMIN_SERVER=${PROTOCOL}://${HOST_IP}:${STS_ADMIN_HTTPS_PORT}
else    
        PROTOCOL=http        
        STS_SERVER=${PROTOCOL}://${HOST_IP}:${STS_PORT}
        STS_ADMIN_SERVER=${PROTOCOL}://${HOST_IP}:${STS_ADMIN_PORT}
fi


# Build images
sudo STS_PORT=${STS_PORT} \
STS_HTTPS_PORT=${STS_HTTPS_PORT} \
STS_ADMIN_PORT=${STS_ADMIN_PORT} \
STS_ADMIN_HTTPS_PORT=${STS_ADMIN_HTTPS_PORT} \
STS_SERVER=${STS_SERVER} \
STS_ADMIN_SERVER=${STS_ADMIN_SERVER} \
HOST_PORT=${HOST_PORT} \
API_PORT=${API_PORT} \
API_URL=${API_URL} \
API_NAME=${API_NAME} \
USE_SSL=${USE_SSL} \
HOST_SERVER=${HOST_SERVER} \
CLIENT_ID=${CLIENT_ID} \
docker-compose build

# Run the containers
sudo STS_PORT=${STS_PORT} \
STS_HTTPS_PORT=${STS_HTTPS_PORT} \
STS_ADMIN_PORT=${STS_ADMIN_PORT} \
STS_ADMIN_HTTPS_PORT=${STS_ADMIN_HTTPS_PORT} \
STS_SERVER=${STS_SERVER} \
STS_ADMIN_SERVER=${STS_ADMIN_SERVER} \
HOST_PORT=${HOST_PORT} \
API_PORT=${API_PORT} \
API_URL=${API_URL} \
API_NAME=${API_NAME} \
USE_SSL=${USE_SSL} \
HOST_SERVER=${HOST_SERVER} \
CLIENT_ID=${CLIENT_ID} \
docker-compose up -d

# Open front/admin and swagger for api
xdg-open "${HOST_URL}" &
xdg-open "${HOST_URL}/admin" &
xdg-open "${API_SERVER}:${API_PORT}/swagger" &
exit
