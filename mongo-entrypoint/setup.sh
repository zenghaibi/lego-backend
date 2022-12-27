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
  },
  {
    id: 21,
    uuid: 'bacc',
    title: '樊登解读意志力-复制',
    desc: '未命名作品',
    contentId: '5fa128349fa7b1005c9f0541',
    publishContentId: '5fa128749fa7b1005c9f0542',
    author: '136****5632',
    coverImg: 'http://static-dev.imooc-lego.com/upload-files/screenshot-036563.png',
    isTemplate: true,
    status: 2,
    copiedCount: 79,
    latestPublishAt: '2020-11-04T01:28:16.000Z',
    isHot: true,
    isNew: true,
    orderIndex: 0,
    isPublic: true,
    createdAt: '2020-11-03T09:51:48.000Z',
    updatedAt: '2022-09-22T10:28:42.000Z',
  }
])
EOF
