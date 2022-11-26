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
