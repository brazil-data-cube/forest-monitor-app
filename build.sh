#!/bin/bash

##### BUILD

echo
echo "BUILD STARTED"
echo

cd forest-monitor-app
docker build -t image-to-build-forest-monitor-app . --no-cache

docker run --name forest-monitor-app-node-build -v $PWD/../deploy/dist:/deploy/dist image-to-build-forest-monitor-app
docker rm forest-monitor-app-node-build
docker rmi image-to-build-forest-monitor-app

cd ../deploy
echo
echo "NEW TAG:"
read IMAGE_TAG
IMAGE_BASE="registry.dpi.inpe.br/brazildatacube/forest-monitor-app"
IMAGE_FULL="${IMAGE_BASE}:${IMAGE_TAG}"

docker build -t ${IMAGE_FULL} .
sudo rm -r dist
docker push ${IMAGE_FULL}
