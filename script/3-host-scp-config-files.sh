#!/bin/bash
##################################

# RPiのホスト名
HOST_NAME=rpi600test

##################################

func_scp () {
  echo host:conf/$1 を rpi:$2 へコピー
  scp $1 pi@${HOST_NAME}.local:/tmp/.
  ssh pi@${HOST_NAME}.local "sudo cp /tmp/$1 $2"
}

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE:-$0}" )" && pwd )"
cd ${SCRIPT_DIR}/conf

func_scp rc.local /etc/rc.local
func_scp mosquitto.conf /etc/mosquitto/mosquitto.conf
func_scp init.d.mosquitto /etc/init.d/mosquitto

echo 
echo next action : 
echo RPi上でram化スクリプトを実行
echo [host]$ ssh pi@${HOST_NAME}.local
echo [rpi]$ ../4-rpi-sd-to-ramfs.sh
echo 

