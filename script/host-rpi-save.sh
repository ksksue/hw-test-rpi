#!/bin/sh

###############################################
# macでSDカードをマウントしたときの disk? の数字。dfコマンドで確認可
DISK_NUM=2

# RPiイメージファイルの保存先パス
IMAGE_PATH=save.img
###############################################

sudo diskutil umount /dev/disk${DISK_NUM}s1
sleep 1

sync
sudo dd bs=4m if=/dev/rdisk${DISK_NUM} of=${IMAGE_PATH}
sync

say Done Done Done

