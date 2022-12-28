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
    id: 18,
    title: '前端架构师直播海报',
    desc: '未命名作品',
    author: '136****5632',
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    copiedCount: 1766,
    isHot: true,
    createdAt: '2020-11-18T05:47:04.000Z',
    user: {
      username: '18080220865',
      nickName: '乐高0865'
    }
  },
  {
    id: 19,
    title: '1024 程序员日',
    desc: '1024 程序员日',
    author: '185****2625',
    coverImg: 'http://static-dev.imooc-lego.com/imooc-test/sZHlgv.png',
    copiedCount: 1268,
    isHot: true,
    createdAt: '2020-11-26T09:27:19.000Z',
    user: {
      username: '18080220865',
      nickName: '乐高0865'
    }
  },
  {
  id: 20,
    title: '招聘-慕课乐高',
    desc: '招聘广告页',
    author: '185****2625',
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-323204.png',
    copiedCount: 628,
    isHot: false,
    createdAt: '2020-11-25T07:37:23.000Z',
    user: {
      username: '18080220865',
      nickName: '乐高0865'
    }
  },
  {
    id: 21,
    title: '未命名作品',
    desc: '未命名作品',
    author: '136****5632',
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-677311.png',
    copiedCount: 340,
    isHot: false,
    createdAt: '2020-11-23T06:24:17.000Z',
    user: {
      username: '18080220865',
      nickName: '乐高0865'
    }
  },
  {
    id: 23,
    title: '慕课资讯',
    desc: '程序员的早读时间',
    author: '136****5632',
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-726751.png',
    copiedCount: 276,
    isHot: false,
    createdAt: '2020-11-18T14:48:36.000Z',
    user: {
      username: '18080220865',
      nickName: '乐高0865'
    }
  },
  {
    id: 24,
    title: '每日分享',
    desc: '每日分享卡片',
    author: '136****5632',
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-682056.png',
    copiedCount: 213,
    isHot: false,
    createdAt: '2020-11-18T14:41:17.000Z',
    user: {
      username: '18080220865',
      nickName: '乐高0865'
    }
  },
  {
    id: 22,
    title: '慕课 Live Java 入门编程课',
    desc: '慕课 Live 只需3天 每天1.5 小时 0 基础新人 Java 入门编程课',
    author: '136****5632',
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-133701.png',
    copiedCount: 161,
    isHot: false,
    createdAt: '2020-11-21T09:28:24.000Z',
    user: {
      username: '18080220865',
      nickName: '乐高0865'
    }
  },
  {
    id: 25,
    title: '慕课 Live',
    desc: '这是慕课 live 如何搭建一套混合移动应用架构的海报',
    author: '136****5632',
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-649919.png',
    copiedCount: 96,
    isHot: false,
    createdAt: '2020-11-18T12:36:49.000Z',
    user: {
      username: '18080220865',
      nickName: '乐高0865'
    }
  },
  {
    id: 28,
    title: '中秋快乐',
    desc: '中秋快乐',
    author: '159****5014',
    coverImg: 'http://static.imooc-lego.com/upload-files/screenshot-388804.png',
    copiedCount: 83,
    isHot: false,
    createdAt: '2020-11-18T09:15:48.000Z',
    user: {
      username: '18080220865',
      nickName: '乐高0865'
    }
  },
  {
    id: 27,
    title: '樊登读书-意志力',
    desc: '樊登读书-意志力',
    author: '159****5014',
    coverImg: 'http://static.imooc-lego.com/upload-files/screenshot-126349.png',
    copiedCount: 81,
    isHot: false,
    createdAt: '2020-11-18T11:16:11.000Z',
    user: {
      username: '18080220865',
      nickName: '乐高0865'
      }
    }
  } 
])
EOF