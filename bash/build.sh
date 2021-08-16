#!/bin/bash
# set
set -eux
set -o pipefail

# set #命令行下不带任何参数，直接运行set，会显示所有的环境变量和 Shell 函数
# set -u #遇到不存在的变量就会报错，并停止执行 (或`set -o nounset`)
# set -x #在运行结果之前，先输出执行的那一行命令 (或`set -o xtrace`)
# set -e #脚本只要发生错误，就终止执行(根据返回值来判断，一个命令是否运行失败)->set +e表示关闭-e选项，set -e表示重新打开-e选项（或`set -o errexit`）
# set -o pipefail #管道命令，就是多个子命令通过管道运算符（|）组合成为一个大的命令。Bash 会把最后一个子命令的返回值，作为整个命令的返回值,为了解决此问题

pwd=$PWD
base=${pwd%\/*}
name=${pwd##*/}

if [ $name == "setup" ]; then

    # [CI/CD](https://mp.weixin.qq.com/s/sWEDT3sW9bTwyucPg-gExw)

    rm -rf "$base/setup/dist"

    mkdir "$base/setup/dist"
    mkdir "$base/setup/dist/sub"

    cd "$base/hs-micro-app" && yarn install && yarn build && cp -r "$base/hs-micro-app/dist/" "$base/setup/dist/sub/app"
    cd "$base/hs-micro-mgr" && yarn install && yarn build && cp -r "$base/hs-micro-mgr/dist/" "$base/setup/dist/sub/mgr"

    tar -czvf "$base/setup/dist.tar" ./dist/**

    # scp ./dist.tar root@xxx.xx.xx.xxx:~
    # shh root@xxx.xx.xx.xxx "tar zxvf ~/dist.tar && mv dist/* /home/nginx/html"
    # 配置nginx.config

    echo "Successful!"
else
    echo "请在setup根目录中执行此脚本"
fi
