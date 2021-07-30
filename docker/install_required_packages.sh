#!/bin/bash

# Using Debian, as root

apt-get update
apt-get install -y curl git zip

# Node.js 16
# https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
# https://github.com/nodesource/distributions/blob/master/README.md
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt-get update
apt-get install -y nodejs
npm install -g yarn

if [[ "$*" == *"--windows"* ]]
then

# Wine
# https://wiki.debian.org/fr/Wine
dpkg --add-architecture i386
apt-get update
apt-get install -y wine wine32 wine64 libwine libwine:i386 fonts-wine

# Mono
# https://www.mono-project.com/download/stable/#download-lin-debian
apt-get install -y dirmngr gnupg apt-transport-https ca-certificates
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF
sh -c 'echo "deb https://download.mono-project.com/repo/debian stable-buster main" > /etc/apt/sources.list.d/mono-official-stable.list'
apt-get update
apt-get install -y mono-complete

fi