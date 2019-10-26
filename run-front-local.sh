#!/bin/bash
#sudo chmod +x ./run-front-local.sh && ./run-front-local.sh
. ./env.sh
cd ./Web
gnome-terminal --tab --title="frontend" -- bash -c 'ng serve -o --port=4200 --configuration=dev' --
#cd Web & ng serve -o --port=4200 --configuration=dev
