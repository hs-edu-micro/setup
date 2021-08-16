#!/bin/bash
# set
set -eux
set -o pipefail

# 变量声明等号左右没有空格
pwd=$PWD
# 字符串处理：https://www.cnblogs.com/lsgxeva/p/10696620.html
base=${pwd%\/*}

cp -r ./communal/ "$base/hs-micro-app/src/utils"
cp -r ./communal/ "$base/hs-micro-mgr/src/utils"