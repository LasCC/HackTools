#!/bin/bash

CONTAINER_NAME="hacktools-build"

sudo docker build -t $CONTAINER_NAME -f Dockerfile.build .
sudo docker run -it --rm -v $(pwd)/:/usr/src/app/ $CONTAINER_NAME
sudo chown -R $(id -u):$(id -g) $(pwd)/{.output,.wxt}