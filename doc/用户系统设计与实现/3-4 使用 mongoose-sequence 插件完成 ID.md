#### 使用mongoose插件

mysql数据库通过auto-increment 字段提供的ID自增的功能

```javascript
  ID int NOT NULL AUTO_INCREMENT,
```

**mongoDB通过自动创建_id 字段来完成数据的区分**

```javascript
  _id: ObjectId('616fc63f417f1fd14bb68456')
```

**mongoose插件**
文档地址：https://mongoosejs.com/docs/plugins.html

**mongoose-sequence**
文档地址: https://github.com/ramiel/mongoose-sequence

掉坑里了，老师讲的

import * as AutoIncrementFactory from 'mongoose-sequence';

正确的写法应该这样

import AutoIncrementFactory from 'mongoose-sequence';
