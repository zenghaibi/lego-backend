// 链接数据库
let db = connect('mongodb://admin:pass@localhost:27017/admin')
// 我们选择对应的lego数据库
db = db.getSiblingDB('lego')
// 创建一个 lego 的管理员用户
db.createUser({
  user:'user',
  pwd:'pass',
  roles:[{role:'readWrite',db:'lego'}]
})
// 添加一些测试数据
db.createCollection('works')
db.works.insertOne({
  id:19,
  title:'1024程序员日',
  desc:'1024程序员日',
  author:'18080220865',
  coverImg:'http://static-dev.imooc-lego.com/imooc-test/sZHlgv.png',
  copiedCount: 737,
  isHot: true,
  isTemplate:true,
  createdAt:'2020-11-26T09:2729.000z',
})
db.works.insertMany([{
  "id": 72,
  "uuid": "bacc",
  "title": "樊登解读意志力-复制",
  "desc": "未命名作品",
  "contentId": "5fa128349fa7b1005c9f0541",
  "publishContentId": "5fa128749fa7b1005c9f0542",
  "author": "136****5632",
  "coverImg": "http://static-dev.imooc-lego.com/upload-files/screenshot-036563.png",
  "isTemplate": true,
  "status": 2,
  "copiedCount": 79,
  "latestPublishAt": "2020-11-04T01:28:16.000Z",
  "isHot": true,
  "isNew": true,
  "orderIndex": 0,
  "isPublic": true,
  "createdAt": "2020-11-03T09:51:48.000Z",
  "updatedAt": "2022-09-22T10:28:42.000Z",
  "user": {
    "userName": "136****5632",
    "nickName": "Viking3",
    "gender": 0,
    "picture": "http://imooc-lego-resource-dev.oss-cn-hangzhou.aliyuncs.com/logo-915499.png"
  }
},{
  "id": 71,
  "uuid": "caa9",
  "title": "大山的美",
  "desc": "心灵的港湾",
  "contentId": "5f9f6e4f28ae00005ca22dd3",
  "publishContentId": "5f9f6f0e28ae00005ca22dd4",
  "author": "136****5632",
  "coverImg": "http://static-dev.imooc-lego.com/upload-files/screenshot-083816.png",
  "isTemplate": true,
  "status": 2,
  "copiedCount": 43,
  "latestPublishAt": "2021-04-08T13:27:12.000Z",
  "isHot": true,
  "isNew": false,
  "orderIndex": 0,
  "isPublic": true,
  "createdAt": "2020-11-02T02:26:23.000Z",
  "updatedAt": "2022-12-26T09:41:38.000Z",
  "user": {
    "userName": "136****5632",
    "nickName": "Viking3",
    "gender": 0,
    "picture": "http://imooc-lego-resource-dev.oss-cn-hangzhou.aliyuncs.com/logo-915499.png"
  }
},{
  "id": 53,
  "uuid": "213c",
  "title": "樊登解读意志力",
  "desc": "未命名作品",
  "contentId": "5f8e8f942aa04c005c2d205d",
  "publishContentId": "5f8e8fbd2aa04c005c2d205e",
  "author": "136****5632",
  "coverImg": "http://static-dev.imooc-lego.com/upload-files/screenshot-427279.png",
  "isTemplate": true,
  "status": 2,
  "copiedCount": 33,
  "latestPublishAt": "2020-11-04T01:54:20.000Z",
  "isHot": false,
  "isNew": true,
  "orderIndex": 0,
  "isPublic": true,
  "createdAt": "2020-10-20T07:19:48.000Z",
  "updatedAt": "2022-12-25T16:02:18.000Z",
  "user": {
    "userName": "136****5632",
    "nickName": "Viking3",
    "gender": 0,
    "picture": "http://imooc-lego-resource-dev.oss-cn-hangzhou.aliyuncs.com/logo-915499.png"
  }
},{
  "id": 47,
  "uuid": "62eb",
  "title": "国庆小长假复制",
  "desc": "高兴的很 嘻嘻",
  "contentId": "5f86bf6a0d63c0005c1077ab",
  "publishContentId": "5f8e8c3b2aa04c005c2d205c",
  "author": "136****5632",
  "coverImg": "http://static-dev.imooc-lego.com/upload-files/screenshot-137908.png",
  "isTemplate": true,
  "status": 2,
  "copiedCount": 14,
  "latestPublishAt": "2020-11-04T01:55:58.000Z",
  "isHot": true,
  "isNew": true,
  "orderIndex": 0,
  "isPublic": true,
  "createdAt": "2020-10-14T09:05:46.000Z",
  "updatedAt": "2022-05-05T01:44:33.000Z",
  "user": {
    "userName": "136****5632",
    "nickName": "Viking3",
    "gender": 0,
    "picture": "http://imooc-lego-resource-dev.oss-cn-hangzhou.aliyuncs.com/logo-915499.png"
  }
},{
  "id": 46,
  "uuid": "8e55",
  "title": "意志力",
  "desc": "未命名作品",
  "contentId": "5f8571f60d63c0005c1077a9",
  "publishContentId": "5f8579f70d63c0005c1077aa",
  "author": "185****2625",
  "coverImg": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f857a34429b263b2a5272fb.png",
  "isTemplate": true,
  "status": 2,
  "copiedCount": 5,
  "latestPublishAt": "2020-10-13T09:58:16.000Z",
  "isHot": false,
  "isNew": true,
  "orderIndex": 0,
  "isPublic": true,
  "createdAt": "2020-10-13T09:23:02.000Z",
  "updatedAt": "2022-04-13T06:18:06.000Z",
  "user": {
    "userName": "185****2625",
    "nickName": "乐高2625",
    "gender": 1,
    "picture": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f79389d4737571e2e1dc7cb.png"
  }
},{
  "id": 44,
  "uuid": "ac64",
  "title": "各种封面",
  "desc": "未命名作品",
  "contentId": "5f855fb10d63c0005c1077a6",
  "publishContentId": "5f8561dd0d63c0005c1077a7",
  "author": "136****5632",
  "coverImg": "http://static-dev.imooc-lego.com/upload-files/screenshot-746487.png",
  "isTemplate": true,
  "status": 2,
  "copiedCount": 5,
  "latestPublishAt": "2020-11-03T09:55:18.000Z",
  "isHot": true,
  "isNew": false,
  "orderIndex": 0,
  "isPublic": true,
  "createdAt": "2020-10-13T08:05:05.000Z",
  "updatedAt": "2022-02-08T07:25:45.000Z",
  "user": {
    "userName": "136****5632",
    "nickName": "Viking3",
    "gender": 0,
    "picture": "http://imooc-lego-resource-dev.oss-cn-hangzhou.aliyuncs.com/logo-915499.png"
  }
},{
  "id": 42,
  "uuid": "1c25",
  "title": "帅气的产品复制",
  "desc": "未命名作品",
  "contentId": "5f82f51b0d63c0005c1077a3",
  "publishContentId": "5f82f5560d63c0005c1077a4",
  "author": "185****2625",
  "coverImg": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f880b247805883b2cd03bb3.png",
  "isTemplate": true,
  "status": 2,
  "copiedCount": 3,
  "latestPublishAt": "2020-10-15T08:41:09.000Z",
  "isHot": false,
  "isNew": true,
  "orderIndex": 0,
  "isPublic": true,
  "createdAt": "2020-10-11T12:05:47.000Z",
  "updatedAt": "2021-08-27T14:03:55.000Z",
  "user": {
    "userName": "185****2625",
    "nickName": "乐高2625",
    "gender": 1,
    "picture": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f79389d4737571e2e1dc7cb.png"
  }
},{
  "id": 40,
  "uuid": "5429",
  "title": "国庆小长假",
  "desc": "高兴的很 嘻嘻",
  "contentId": "5f8274970d63c0005c1077a0",
  "publishContentId": "5f827db30d63c0005c1077a1",
  "author": "136****5632",
  "coverImg": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f8e8ecf7805883b2cd03bb9.png",
  "isTemplate": true,
  "status": 2,
  "copiedCount": 7,
  "latestPublishAt": "2020-10-20T07:16:49.000Z",
  "isHot": false,
  "isNew": false,
  "orderIndex": 0,
  "isPublic": true,
  "createdAt": "2020-10-11T02:57:27.000Z",
  "updatedAt": "2022-04-28T09:02:04.000Z",
  "user": {
    "userName": "136****5632",
    "nickName": "Viking3",
    "gender": 0,
    "picture": "http://imooc-lego-resource-dev.oss-cn-hangzhou.aliyuncs.com/logo-915499.png"
  }
}])
