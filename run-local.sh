#!/bin/bash
#sudo chmod +x ./run-local.sh && ./run-local.sh
./env.sh
PORT=4200
cd ./Api
gnome-terminal --tab --title="backend" --command "bash -c 'dotnet build & dotnet publish & dotnet run'"
cd ../Web
gnome-terminal --tab --title="frontend" --command "bash -c 'ng serve -o --port=${PORT} --configuration=dev'"
