#### Service

**service就是在复杂业务场景下用于做业务逻辑封装一个抽象层**

* 保持Controller中逻辑更简洁
* 保业务逻辑的独立性，抽象出来的service可以被多个Controller重复调用
* 将逻辑和展现分离，降低耦合，更容易编写测试用例。

**使用场景**

* 复杂数据处理，需要展现的信息需要从数据库获取，还要经过一定规则计算，
  才能返回用户显示。
* 第三方服务调用，请求其他的第三方API

Dog API 地址:https://dog.ceo/api/breeds/image/random

```
import { Service } from 'egg';
interface DogResp {
	message: string;
	status: string;
}
export default class DogService extends Service {
  async show() {
    const resp = await this.ctx.curl<DogRest>(
      'https://dog.ceo/api/breeds/image/random',
      {
        dataType: 'json',
      },
    );
    return resp.data;
  }
}
```

-----------------------------在Controller中调servie 注意文件是首字母大写Dog.ts -------------------------------------

```
  async getDog() {
    const { service, ctx } = this;
    const resp = await service.dog.show(); ⬆️
    ctx.body = resp.message;
    ctx.status = 200;
  }
```

---------------------------------------在router.ts文件中调用controller---------------------------------------------------

router.get('/dog', controller.test.getDog);     ⬆️

Egg.js内置HttpClient: https://eggjs.org/zh-cn/core/httpclient.html
