#!/bin/sh

#sudo chmod +x ./publish-images.sh & ./publish-images.sh


docker tag devremoto/tgappmodel-front devremoto/tgappmodel-front
docker push devremoto/tgappmodel-front

docker tag devremoto/tgappmodel-api devremoto/tgappmodel-api
docker push devremoto/tgappmodel-api



