### ioredis进行redis操作
```javascript
import Redis from 'ioredis';
// 创建redis实例
const redis = new Redis(6379);

// 一个发布的实例
const pub = new Redis(6379);
// 一个订阅的实例
const sub = new Redis(6379);
async function run() {
  try {
    // 定义10秒过期
    await redis.set('name', '曾海碧', 'EX', 10);
    const result = await redis.get('name');
    console.log(result);
    // array
    await redis.del('software'); // 删除software
    await redis.lpush('software', 'mongo'); //从左边进行插入
    await redis.rpush('software', 'nodeJS'); //从右边进行插入
    await redis.lpush('software', 'mysql'); //从左边进行插入
    const list_software = await redis.lrange('software', 0, 10);
    console.log(list_software);
    // object
    await redis.hmset('person', { name: 'H.B Zeng', age: 30 });
    const obj = await redis.hgetall('person');
    console.log(obj);
    // sub 订阅端
    // 1. 由订问方创建一个订阅频道channel-1
    const r = await sub.subscribe('channel-1');
    console.log('r:', r);
    sub.on('message', (channel, message) => {
      // 这里10后会接收一条消息消息
      console.log(`Receivied ${message} from ${channel}`);
    });
    // pub 发布端10秒后发布一消息
    setTimeout(() => {
      pub.publish('channel-1', 'hello redis消息发布一条消息');
    },10000)
  } catch (e) {
    console.error(e);
  } finally {
    // 关闭连接
    // redis.disconnect();
  }
}
run();

```