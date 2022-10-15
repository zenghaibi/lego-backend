**github.com/okoala/egg-jwt**

* npm install --save egg-jwt
* 启用 egg-jwt 中间件

```javascript
  jwt: {
    enable: true,
    package: 'egg-jwt'
  }
```

* 配置必配的参数secret

```javascript
  config.jwt = {
    secret: '1234567890',
  };
```

* 规换原来自己写的中间件

```javascript
    // 原来sign 加密签名生成token方法就不需要了直接注释掉
    // import { sign } from 'jsonwebtoken';
    const token = app.jwt.sign(
      { username: user.username },
      app.config.jwt.secret,
      {
        expiresIn: 60 * 60,
      },
    );

    // 鉴权方法不用修改
  async show() {
    // egg-jwt 跟我们写法是一样的，不谋而合。
    const { ctx, service } = this;
    const userData = await service.user.findByUsername(ctx.state.user.username);
    ctx.helper.success({ ctx, res: userData?.toJSON() });
  }
```

* 在router.ts 中注释掉手工生成中间件
```javascript
import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // 注释掉手工生成中间件
  // const jwt = app.middleware.jwt({
  //   secret: app.config.jwt.secret,
  // });
  router.get('/', controller.home.index);
  router.post('/api/users/create', controller.user.createByEmail);
  // 这里使用egg-jwt 插件 (app.jwt 这里没有定义类文件所以直接断言成 any)
  router.get('/api/users/getUserInfo', app.jwt as any, controller.user.show);
  router.post('/api/users/loginByEmail', controller.user.loginByEmail);
};
```

### 处在使中间过程发生异常，使用自己定义的错误信息。
**编写下中间件来处理异常** （customError.ts） 
```javascript
import { Context } from 'egg'
export default () => {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next()
    } catch (e) {
      const error = e as any
      if (error && error.status === 401) {
        return ctx.helper.error({ ctx, errorType: 'loginValidateFail'})
      }
      throw error
    }
  }
}

```

