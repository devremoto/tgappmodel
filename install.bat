@echo off
docker-machine start default
docker pull devremoto/identity
docker pull devremoto/identity-admin

SET API_NAME=api1
SET STS_PORT=5000
SET HOST_IP=192.168.0.5
SET STS_HTTPS_PORT=5001
SET STS_ADMIN_PORT=9000
SET STS_ADMIN_HTTPS_PORT=9001
SET STS_SERVER=http://%HOST_IP%
SET STS_ADMIN_SERVER=%STS_SERVER%

SET HOST_SERVER=http://%HOST_IP%
SET HOST_PORT=4200
SET HOST_URL=%HOST_SERVER%:%HOST_PORT%
SET API_SERVER=http://%HOST_IP%
SET API_PORT=52050
SET API_URL=%API_SERVER%:%API_PORT%/api/
SET IDENTITY_SERVER=%STS_SERVER%
SET IDENTITY_PORT=5000
SET IDENTITY_URL=%IDENTITY_SERVER%:%IDENTITY_PORT%
SET USE_SSL=true
SET CLIENT_ID="tgappmodel"

cd %~dp0

rem Build images
STS_PORT=%STS_PORT% ^
STS_HTTPS_PORT=%STS_HTTPS_PORT% ^
STS_ADMIN_PORT=%STS_ADMIN_PORT% ^
STS_ADMIN_HTTPS_PORT=%STS_ADMIN_HTTPS_PORT% ^
STS_SERVER=%STS_SERVER% ^
STS_ADMIN_SERVER=%STS_ADMIN_SERVER% ^
HOST_PORT=%HOST_PORT% ^
API_PORT=%API_PORT% ^
API_URL=%API_URL% ^
API_NAME=%API_NAME% ^
USE_SSL=%USE_SSL% ^
IDENTITY_SERVER=%IDENTITY_URL% ^
HOST_SERVER=%HOST_SERVER% ^
CLIENT_ID=%CLIENT_ID% ^
docker-compose build

rem Run the containers
STS_PORT=%STS_PORT% ^
STS_HTTPS_PORT=%STS_HTTPS_PORT% ^
STS_ADMIN_PORT=%STS_ADMIN_PORT% ^
STS_ADMIN_HTTPS_PORT=%STS_ADMIN_HTTPS_PORT% ^
STS_SERVER=%STS_SERVER% ^
STS_ADMIN_SERVER=%STS_ADMIN_SERVER% ^
HOST_PORT=%HOST_PORT% ^
API_PORT=%API_PORT% ^
API_URL=%API_URL% ^
API_NAME=%API_NAME% ^
USE_SSL=%USE_SSL% ^
IDENTITY_SERVER=%IDENTITY_URL% ^
HOST_SERVER=%HOST_SERVER% ^
CLIENT_ID=%CLIENT_ID% ^
docker-compose up -d

rem Open front/admin and swagger for api
start %HOST_URL%
start %HOST_URL%/admin
start %API_SERVER%:%API_PORT%/swagger
exit
