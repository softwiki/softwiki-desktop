#!/bin/bash
cd "$(dirname "$0")"
cd docker
sudo docker build --build-arg UID=$(id -u) --build-arg GID=$(id -g) --tag="tempname-builder" .
cd ..
sudo docker run -it -v $PWD:/home/dev/volume tempname-builder