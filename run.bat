call pre.bat

docker-compose -f docker-compose.yml build

docker-compose -f docker-compose.yml up -d

rem Open front/admin and swagger for api
start %HOST_URL%
start %HOST_URL%/admin
start %API_SERVER%:%API_PORT%/swagger
cmd /k