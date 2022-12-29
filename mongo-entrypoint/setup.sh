#!/bin/bash

# shell脚本中发生错误，即命令返回值不等于0，则停止执行并退出shell
set -e

mongosh <<EOF
use admin
db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD')
use lego
db.createUser({
  user:'$MONGO_DB_USERNAME',
  pwd:'$MONGO_DB_PASSWORD',
  roles:[{
    role:'readWrite',
    db:'lego'
  }]
})
EOF