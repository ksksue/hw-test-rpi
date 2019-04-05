#!/bin/bash

# WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!
# のエラーが出る場合はホストPCの
# ~/.ssh/known_hosts
# の
# raspberrypi.local
# の行を削除すること

########################

# RPiのホスト名
HOST_NAME=raspberrypi
#HOST_NAME=rpi600-1

########################

# setupスクリプトファイル名
RPI_SETUP_FILE=2-rpi-setup.sh
# ram化スクリプトファイル名
RPI_SD_TO_RAM_FILE=4-rpi-sd-to-ramfs.sh

func_scp () {
  echo host:conf/$1 を rpi:$2 へコピー
  scp -r $1 pi@${HOST_NAME}.local:$2
}

DESC="dot_ssh内に自PCの公開鍵を書き込み済みか?"

if (whiptail --title "SSH File Check Script" --yesno "${DESC}" 20 60) then
    echo ""
else
    exit 0
fi


func_scp dot_ssh .ssh
func_scp ${RPI_SETUP_FILE} .
func_scp ${RPI_SD_TO_RAM_FILE} .

echo
echo RPiへ公開鍵暗号でsshできることを確認\(${RPI_SETUP_FILE}内のgit cloneでキーチェーンが必要\)
echo RPiへログインし、/home/pi/${RPI_SETUP_FILE} を実行
echo 
echo [host]$ ssh pi@${HOST_NAME}.local
echo [rpi] $ ./${RPI_SETUP_FILE}
echo 

