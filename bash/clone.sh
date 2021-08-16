#!/bin/bash
# set
set -eux
set -o pipefail

# 只克隆某个指定分支的最近一次commit (加快clone速度)
# 指定路径以及名称
git clone --depth 1 --branch main https://github.com/hs-edu-micro/hs-micro-app.git ../hs-micro-app
git clone --depth 1 --branch main https://github.com/hs-edu-micro/hs-micro-mgr.git ../hs-micro-mgr