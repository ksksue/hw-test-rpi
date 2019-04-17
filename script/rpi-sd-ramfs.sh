#!/bin/bash

# https://github.com/janztec/empc-arpi-linux-readonly

# Disable SWAP
sudo dphys-swapfile swapoff
sudo systemctl disable dphys-swapfile
sudo apt-get purge -y dphys-swapfile

# Disable man indexing 
sudo chmod -x /etc/cron.daily/man-db
sudo chmod -x /etc/cron.weekly/man-db

# Move /var/log to tmpfs
echo "tmpfs  /var/log  tmpfs  size=70M  0  0" | sudo tee -a /etc/fstab

# Install script
cd /tmp
wget https://raw.githubusercontent.com/janztec/empc-arpi-linux-readonly/master/\
install-experimental.sh -O install-experimental.sh

sudo bash install-experimental.sh

