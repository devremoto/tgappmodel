@echo off

SET HOST_PORT=4200
SET HOST_IP=localhost
SET HOST_SERVER=http://%HOST_IP%
SET HOST_URL=%HOST_SERVER%:%HOST_PORT%

SET API_NAME=api1
SET API_SERVER=http://%HOST_IP%
SET API_PORT=52050
SET API_URL=%API_SERVER%:%API_PORT%/api/
SET CLIENT_ID=tgappmodel
SET USE_AUTHORITY=true
SET STS_ADMIN_SERVER=%HOST_SERVER%:9000
SET DB_TYPE=SQLITE

SET STS_PORT=5000
SET STS_HTTPS_PORT=5001
SET STS_SERVER=http://%HOST_IP%:%STS_PORT%

SET USE_SSL=false
SET USE_ENV=true

if %USE_SSL% == true (
    SET STS_SERVER=https://%HOST_IP%:%STS_HTTPS_PORT%
)
echo %STS_SERVER%
rem docker-compose down