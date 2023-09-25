#!/bin/bash

CONTAINER_NAME="hacktools-build"

sudo docker build -t $CONTAINER_NAME -f Dockerfile.build .
sudo docker run -it --rm -v $(pwd)/dist:/usr/src/app/dist $CONTAINER_NAME
sudo chown -R $(id -u):$(id -g) $(pwd)/dist