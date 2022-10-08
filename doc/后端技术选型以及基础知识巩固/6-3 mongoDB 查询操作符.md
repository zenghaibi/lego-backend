### https://docs.mongodb.com/drivers/node/current/fundamentals/crud/query-document

# 指定查询

## 概述

**大多数 CRUD 操作允许您通过在查询文档**中指定匹配条件来缩小匹配文档的范围。查询文档包含一个或多个查询运算符，这些运算符应用于特定字段，这些字段确定要包含在结果集中的文档。

在查询文档中，您可以将字段与文字值（例如 `{ title: 'The Room' }`）进行匹配，也可以组合 [查询运算符](https://www.mongodb.com/docs/manual/reference/operator/query/)来表达更复杂的匹配标准。在本指南中，我们介绍了 MongoDB 中的以下查询运算符类别，并展示了如何使用它们的示例：

* [比较运算符](https://www.mongodb.com/docs/manual/reference/operator/query-comparison/) (Comparison Operators 比较操作符)

  * (>) 大于 - $gt
  * (<) 小于 - $lt
  * (>=) 大于等于 -$gte
  * (<=) 小于等于 -$lte
  * (===) 等于 - $eq
  * (!==) 不等于 - $neq
    // 格式
    { age: { $gt: 30 } }
* [逻辑运算符](https://www.mongodb.com/docs/manual/reference/operator/query-logical/) (Logical Operators )

  * 逻辑与 - 直接对象中添加多个条件即中，$and
  * 逻辑或 - $or
* [元素运算符](https://www.mongodb.com/docs/manual/reference/operator/query-element/) (Element Operators)

  * $exists: 判断属性是否存在
  * $type: 数据类型 所有 types 列表
    https: docs.mongodb.com/manual/reference/operator/query/type/#available-types

  格式: { $exists: true }

  {$type: 'string'}
* [评估运算符](https://www.mongodb.com/docs/manual/reference/operator/query-evaluation/)

使用以下代码片段创建描述水果清单的文档集合，以及我们的查询运算符示例：

```
await collection.insertMany([  { "_id": 1, "name": "apples", "qty": 5, "rating": 3 },  { "_id": 2, "name": "bananas", "qty": 7, "rating": 1, "microsieverts": 0.1 },  { "_id": 3, "name": "oranges", "qty": 6, "rating": 2 },  { "_id": 4, "name": "avocados", "qty": 3, "rating": 5 },]);
```

## 笔记

您的查询操作可能会返回对包含匹配文档的游标的引用。要了解如何检查存储在游标中的数据，请参阅 [光标基础页面。](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/cursor/)

## 字面值查询

文字值查询允许您查询与您在查询文档中提供的值完全匹配的数据。文字值查询有两部分：字段名和值。从此类查询返回的文档必须包含一个名称与提供的名称完全相同的字段，并且该字段的值与提供的值完全相同。以下操作使用文字查询来搜索包含名为“name”且值为“apples”的字段的文档：

```
const query = { "name": "apples" };const cursor = collection.find(query);await cursor.forEach(console.dir);
```

此代码段返回以下结果：

```
{ "_id": 1, "name": "apples", "qty": 5, "rating": 3 }
```

## 笔记

字面值查询等价于 `$eq`比较运算符。因此，以下两个查询是等效的：

```
collection.find({   rating: { $eq: 5 }})
```

```
collection.find({   rating: 5})
```

## 比较运算符

比较运算符允许您根据与集合中的值的比较来查询数据。常见的比较运算符包括 `$gt`“大于”比较、`$lt`“小于”比较和 `$ne`“不等于”比较。以下操作使用比较运算符 `$gt`搜索数量值大于 5 的文档并打印出来：

```
// $gt means "greater than"const query = { qty: { $gt : 5 } };const cursor = collection.find(query);await cursor.forEach(console.dir);
```

此代码段返回以下结果：

```
{ "_id": 2, "name": "bananas", "qty": 7, "rating": 1 }{ "_id": 3, "name": "oranges", "qty": 6, "rating": 2 }
```

## 逻辑运算符

逻辑运算符允许您使用应用于字段级运算符结果的逻辑来查询数据。例如，您可以使用该方法查询与比较运算符或文字值查询 `$or` 匹配的文档。`$gt`以下操作使用逻辑运算符 `$not`搜索数量值不大于 5 的文档并打印出来：

```
const query = { qty: { $not: { $gt: 5 }}};const cursor = collection.find(query);await cursor.forEach(console.dir);
```

此代码段返回以下结果：

```
{ "_id": 4, "name": "avocados", "qty": 3, "rating": 5 }{ "_id": 1, "name": "apples", "qty": 5, "rating": 3 }
```

## 笔记

每当查询文档包含多个元素时，这些元素就会与隐式逻辑运算符组合在一起，`$and`以确定哪些文档与查询匹配。因此，以下两个查询是等效的：

```
collection.find({  rating: { $eq: 5 },  qty: { $gt: 4 }})
```

```
collection.find({  $and: [     { rating: { $eq: 5 }},     { qty: { $gt: 4 }}  ]})
```

有关比较运算符的更多信息，请参阅参考手册条目[比较查询运算符。](https://www.mongodb.com/docs/manual/reference/operator/query-comparison/)

## 元素运算符

元素运算符允许您根据字段的存在、不存在或类型进行查询。以下操作使用元素运算符 `$exists`搜索包含该 `microsieverts` 字段的文档：

```
const query = { microsieverts: { $exists: true } };const cursor = collection.find(query);await cursor.forEach(console.dir);
```

此代码段返回以下结果：

```
{ "_id": 2, "name": "bananas", "qty": 7, "rating": 1, "microsieverts": 0.1 }
```

有关此运算符的更多信息，请参阅参考手册条目[$exists 运算符。](https://www.mongodb.com/docs/manual/reference/operator/query/exists/)

## 评估运算符

求值运算符允许您在查询集合中的文档时执行更高级别的逻辑，例如正则表达式和文本搜索。常见的求值运算符包括 `$regex`和 `$text`。以下操作使用评估运算符 `$mod`搜索数量值可被 3 整除且余数为 0 的文档：

```
// $mod means "modulo" and returns the remainder after divisionconst query = { qty: { $mod: [ 3, 0 ] } };const cursor = collection.find(query);await cursor.forEach(console.dir);
```

此代码段返回以下结果：

```
{ "_id": 3, "name": "oranges", "qty": 6, "rating": 2 }{ "_id": 4, "name": "avocados", "qty": 3, "rating": 5 }
```

有关此运算符的更多信息，请参阅参考手册条目[$mod 运算符。](https://www.mongodb.com/docs/manual/reference/operator/query/mod/)
