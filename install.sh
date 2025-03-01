#!/bin/sh
#sudo chmod +x ./install.sh && ./install.sh
API_NAME=api1
HOST_SERVER=http://192.168.0.5
HOST_PORT=4200
HOST_URL=${HOST_SERVER}:${HOST_PORT}
API_SERVER=http://192.168.0.5
API_PORT=52050
API_URL=${API_SERVER}:${API_PORT}/api/
IDENTITY_SERVER=https://192.168.0.5
IDENTITY_PORT=5001
IDENTITY_URL=${IDENTITY_SERVER}:${IDENTITY_PORT}
USE_SSL=true
CLIENT_ID="tgappmodel"

# Build images
sudo HOST_PORT=${HOST_PORT} \
API_PORT=${API_PORT} \
API_URL=${API_URL} \
API_NAME=${API_NAME} \
USE_SSL=${USE_SSL} \
IDENTITY_SERVER=${IDENTITY_URL} \
HOST_SERVER=${HOST_SERVER} \
CLIENT_ID=${CLIENT_ID} \
docker-compose build

# Run the containers
sudo HOST_PORT=${HOST_PORT} \
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
