#!/bin/sh
#sudo chmod +x ./install.sh && ./install.sh

sudo chmod +x ./cert.sh
./cert.sh

sudo chmod +x ./env-local.sh
./env-local.sh
# docker tag devremoto/tgappmodel/front devremoto/tgappmodel-front
# docker push devremoto/tgappmodel-front
docker pull devremoto/identity
docker pull devremoto/identity-admin

API_NAME=api1
STS_PORT=5000
HOST_IP=192.168.0.5
STS_HTTPS_PORT=5001
STS_ADMIN_PORT=9000
STS_ADMIN_HTTPS_PORT=9001
STS_SERVER=http://$HOST_IP
STS_ADMIN_SERVER=$STS_SERVER

HOST_SERVER=http://$HOST_IP
HOST_PORT=4200
HOST_URL=${HOST_SERVER}:${HOST_PORT}
API_SERVER=http://$HOST_IP
API_PORT=52050
API_URL=${API_SERVER}:${API_PORT}/api/
IDENTITY_SERVER=$STS_SERVER
IDENTITY_PORT=5000
IDENTITY_URL=${IDENTITY_SERVER}:${IDENTITY_PORT}
USE_SSL=true
CLIENT_ID="tgappmodel"

# Build images
sudo STS_PORT=$STS_PORT \
STS_HTTPS_PORT=$STS_HTTPS_PORT \
STS_ADMIN_PORT=$STS_ADMIN_PORT \
STS_ADMIN_HTTPS_PORT=$STS_ADMIN_HTTPS_PORT \
STS_SERVER=$STS_SERVER \
STS_ADMIN_SERVER=$STS_ADMIN_SERVER \
HOST_PORT=${HOST_PORT} \
API_PORT=${API_PORT} \
API_URL=${API_URL} \
API_NAME=${API_NAME} \
USE_SSL=${USE_SSL} \
IDENTITY_SERVER=${IDENTITY_URL} \
HOST_SERVER=${HOST_SERVER} \
CLIENT_ID=${CLIENT_ID} \
docker-compose build

# Run the containers
sudo STS_PORT=$STS_PORT \
STS_HTTPS_PORT=$STS_HTTPS_PORT \
STS_ADMIN_PORT=$STS_ADMIN_PORT \
STS_ADMIN_HTTPS_PORT=$STS_ADMIN_HTTPS_PORT \
STS_SERVER=$STS_SERVER \
STS_ADMIN_SERVER=$STS_ADMIN_SERVER \
HOST_PORT=${HOST_PORT} \
API_PORT=${API_PORT} \
API_URL=${API_URL} \
API_NAME=${API_NAME} \
USE_SSL=${USE_SSL} \
IDENTITY_SERVER=${IDENTITY_URL} \
HOST_SERVER=${HOST_SERVER} \
CLIENT_ID=${CLIENT_ID} \
docker-compose up -d

# Open front/admin and swagger for api
xdg-open "${HOST_URL}" &
xdg-open "${HOST_URL}/admin" &
xdg-open "${API_SERVER}:${API_PORT}/swagger" &
exit
