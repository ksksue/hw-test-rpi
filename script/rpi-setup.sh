#!/bin/bash

##################################

# デフォから変更後のホスト名
HOST_NAME=rpi

# Timezone
# ※ 他のtimezone は /usr/share/zoneinfo を参照
TIMEZONE=Asia/Tokyo

##################################

# パスワード変更
sudo raspi-config nonint do_change_pass

# ホスト名変更
sudo raspi-config nonint do_hostname ${HOST_NAME}

# Timezone
sudo raspi-config nonint do_change_timezone ${TIMEZONE}

# sshを有効にする
# sudo raspi-config nonint do_ssh 0

# sshを無効にする
# sudo raspi-config nonint do_ssh 1

