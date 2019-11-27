#!/bin/bash
#sudo chmod +x ./run-local.sh && ./run-local.sh
alias copy="cp"
./env.sh
PORT=4200
cd ./Api
gnome-terminal --tab --title="backend" -- bash -c 'dotnet build & dotnet run --project Api.csproj' --
cd ../Web
gnome-terminal --tab --title="frontend" -- bash -c 'ng serve -o --port=4200 --configuration=dev' --
#cd Web & ng serve -o --port=4200 --configuration=dev
#teste
