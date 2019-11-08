#!/bin/sh
#sudo chmod +x ./run.sh && ./run.sh
. ./pre.sh

echo ${HOST_PORT}
echo ------------------------------------
docker logout


# Build images
sudo STS_SERVER=${STS_SERVER} \
STS_ADMIN_SERVER=${STS_ADMIN_SERVER} \
HOST_PORT=${HOST_PORT} \
API_PORT=${API_PORT} \
API_URL=${API_URL} \
API_NAME=${API_NAME} \
USE_SSL=${USE_SSL} \
USE_AUTHORITY=${USE_AUTHORITY} \
HOST_SERVER=${HOST_SERVER} \
HOST_URL=${HOST_URL} \
CLIENT_ID=${CLIENT_ID} \
docker-compose -f docker-compose-build.yml down

# Run the containers
sudo STS_SERVER=${STS_SERVER} \
STS_ADMIN_SERVER=${STS_ADMIN_SERVER} \
HOST_PORT=${HOST_PORT} \
API_PORT=${API_PORT} \
API_URL=${API_URL} \
API_NAME=${API_NAME} \
USE_SSL=${USE_SSL} \
USE_AUTHORITY=${USE_AUTHORITY} \
HOST_SERVER=${HOST_SERVER} \
HOST_URL=${HOST_URL} \
CLIENT_ID=${CLIENT_ID} \
docker-compose -f docker-compose-build.yml up -d

# Open front/admin and swagger for api
xdg-open ${HOST_URL} &
xdg-open ${HOST_URL}/admin &
xdg-open ${API_SERVER}:${API_PORT}/swagger &
