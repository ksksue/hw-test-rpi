#!/bin/sh
###############################################
# mac で SD カードをマウントしたときの disk? の数字。df コマンドで確認可
DISK_NUM=2

# RPi のイメージファイルのパス
IMAGE_PATH=2018-11-13-raspbian-stretch-lite.img
###############################################

sudo diskutil umount /dev/disk${DISK_NUM}s1
sleep 1

sync
sudo dd bs=4m if=${IMAGE_PATH} of=/dev/rdisk${DISK_NUM}
sync

say Done Done Done

