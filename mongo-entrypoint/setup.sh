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
db.createCollection('works')
db.works.insertMany([
  {
    id: 19,
    title: '1024 程序员日',
    desc: '1024 程序员日',
    author: '18080220865',
    coverImg: 'http://static-dev.imooc-lego.com/imooc-test/sZHlgv.png',
    copiedCount: 737,
    isHot: true,
    isTemplate: true,
    isPublic: true,
    createdAt: '2020-11-26T09:27:19.000Z',
  },
  {
    id: 20,
    title: '测试第二数据',
    desc: '1024 程序员日',
    author: '18080220865',
    coverImg: 'http://static-dev.imooc-lego.com/imooc-test/sZHlgv.png',
    copiedCount: 737,
    isHot: true,
    isTemplate: true,
    isPublic: true,
    createdAt: '2020-11-26T09:27:19.000Z',
  }
])
EOF
