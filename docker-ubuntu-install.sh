#!/bin/sh
#to install run this command
#sudo chmod +x ./docker-ubuntu-install.sh && ./docker-ubuntu-install.sh



sudo apt-get update
sudo apt update

curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

sudo usermod -aG docker adilson
sudo apt install docker-compose
