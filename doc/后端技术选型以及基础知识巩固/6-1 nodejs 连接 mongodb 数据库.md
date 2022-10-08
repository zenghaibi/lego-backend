## MongoDB结合Node.js

文档地址：https://docs.mongodb.com/drivers/node/current/quick-start

#### 安装

1. * 创建一个新项目（mkdir learn-mongo & cd learn-mongo）
2. * 安装dirver
     * npm install mongodb --save

* MongoDB 的commands 列表
  https://docs.mongodb.com/manual/reference/command/

```
import { MongoClient } from 'mongodb'
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

async function run() {
  try {
    await client.connect()
    const db = client.db('hello')
    const res = await db.command({ping: 1})
    console.log('connected', res)
  } catch(e) {
    console.error(e)
  } finally {
    await client.close()
  }
}
run()
```
