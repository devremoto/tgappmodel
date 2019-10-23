#!/bin/sh

#sudo chmod +x ./publish-images.sh & ./publish-images.sh


docker tag devremoto/tgappmodel/front devremoto/tgappmodel-front
docker push devremoto/tgappmodel-front

docker tag devremoto/tgappmodel/api devremoto/tgappmodel-api
docker push devremoto/tgappmodel-api

docker tag devremoto/identity devremoto/identity
docker push devremoto/identity

docker tag devremoto/identity/admin devremoto/identity-admin
docker push devremoto/identity-admin
