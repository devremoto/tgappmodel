#!/bin/bash
#sudo chmod +x ./run-local.sh && ./run-local.sh
. ./env.sh
. ./pre.sh
PORT=4200
cd ./Api
gnome-terminal --tab --title="backend" -- bash -c 'dotnet build & dotnet watch run --project Api.csproj' --
cd ../Web
if ${USE_ENV}
then
echo ${USE_ENV}" sim"
gnome-terminal --tab --title="frontend" -- bash -c "ng serve -o --host=192.168.0.5 --port=4200 --configuration=dev" 
else
echo ${USE_ENV}" não"
gnome-terminal --tab --title="frontend" -- bash -c "ng serve -o --port=4200"
fi
#cd Web & ng serve -o --port=4200 --configuration=dev
