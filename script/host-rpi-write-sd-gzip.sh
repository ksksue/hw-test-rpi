#!/bin/sh

###############################################
# macでSDカードをマウントしたときの disk? の数字。dfコマンドで確認可
DISK_NUM=2

# RPiイメージファイルのパス
IMAGE_PATH=save.img.gz
###############################################

sudo diskutil umount /dev/disk${DISK_NUM}s1
sleep 1

sync
sudo gzip -dc ${IMAGE_PATH} | sudo dd bs=4m of=/dev/rdisk${DISK_NUM}
sync

say Done Done Done

