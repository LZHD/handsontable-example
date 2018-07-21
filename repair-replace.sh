#!/bin/bash
#
# 修复node_modules中存在问题的模块
#

echo "start..."

# 1. 修复 表格证书 错误
url_old="./node_modules/handsontable-pro/dist/handsontable.js"
url_new="./src/assets/js/handsontable-pro/handsontable.js"
cp -rf $url_new $url_old

echo "replace pkg success"
