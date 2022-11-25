#### 初始化数据库数据以及运行脚本

**数据库准备工作**

* 数据配置工作，初始化工仍，比如插入一些特定的数据
* 避免使用root用户去启服务，从而提高安全性

**特殊初始化数据库的位置**：//docker-entrypoint-initdb.d

* mongoDB: https://hub.docker.com/ /mongo
* Postgreps: https://hub.docker.com/ /postgres
* 特别注意，只有在数据库没有被创建的情况下，也就是数据库文件夹是空的
  情况睛，脚本才会被执行

**Docker mongo 提供的环境变量**

```
MONGO_INITDB_ROOT_USERNAME
MONGO_INITDB_ROOT_PASSWORD
```

##### 目前为了测试数据库初始化脚本运行，我们选把之前数据库文件清理掉

![1669399712309](image/4-4Docker初始化MongoDB数据库操作/1669399712309.png)

##### 设置环境变量

```
version: '3'
services:
  lego-mongo:
    image: mongo
    container_name: lego-mongo
    volumes:
      - '.docker-volumes/mongo/data:/data/db'
      - '$PWD/mongo-entrypoint/:/docker-entrypoint-initdb.d/'
    ports:
      - 27017:27017
    environment: # 添加环境变量root的admin管理员帐号及密码pass 目前只是测试所有用的都明文
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=pass
```

#### 数据库初始化脚本映设到本地

```
version: '3'
services:
  lego-mongo:
    image: mongo
    container_name: lego-mongo
    volumes:
      - '.docker-volumes/mongo/data:/data/db'
      - '$PWD/mongo-entrypoint/:/docker-entrypoint-initdb.d/'
```

![1669400290359](image/4-4Docker初始化MongoDB数据库操作/1669400290359.png)

##### 数据库初始化脚本

```javascript
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
```

##### 进入容器内，查看初始化脚本是否生效

```bash
# 1.查看容器id
docker ps
# 2.打开容器进入容器内部
docker exec -it 466b2ac4a5c6 bash
```

![1669400945514](image/4-4Docker初始化MongoDB数据库操作/1669400945514.png)
