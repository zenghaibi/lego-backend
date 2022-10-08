## 什么是Mongoose

**问题**

**使用原生的mongoDB nodejs driver 数据结构以及操作过于灵活。**

**解决**

Mongoose: https://mongoosejs.com

* 建立在native mongoDB nodejs driver 之上
* 提出Model, 数据模型的概念，用来约束集合上的数据结构
* 非常多扩展展
* 它是一个ODM（Object Document Mapping) 工具

***谈谈ORM**

ORM指的是**Object Relational Mapping**

*简单的说，ORM就是通实例对象的语法，完成关系型数据库的操作的技*

**优点：**

* 不需再去写晦涩的SQL语句
* 使用面向对象的方式操作数据，代码量少，语义性好，容易理解。
  * Classes 类- Tables
  * Objects  实例 - Records (表中的一行)
  * Attributes 属性 - 字段
* 内置很多功能，数据验证，清洗，预处理等等操作

**例子**

```
let sql = "Insert into Users(username,passsword) Value('john-doe','oomygooturlob')";
conn.query(sql,function(error,resutl){
	if(error) {
		console.log(error)
	} else {
		console.log(result)
	}
})
// 使用 ORM 进行操作
const User = sequelize.define('User', {
	username: Sequelize.STRING,
	password: Sequelize.STRING,
});

// Inserting user
User.create({
	username: 'john-doe',
	password: 'oomygooturlob'
}).then(function(user) {
	console.log(user)
});
```


**ODM针对noSql的数据库，关注文档模型**

```
const User = mongoose.model("User", {
	username: { type: string },
	password: { type: string },
});

// user object
const newUser = new User({
	username: 'john-doe',
	password: 'oomygooturlob',
});
await newUser.save()
```
