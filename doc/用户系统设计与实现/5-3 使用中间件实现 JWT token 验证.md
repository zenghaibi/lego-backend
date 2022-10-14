**jwt中间件**
```javascript
import { Context, EggAppConfig } from 'egg';
import { verify } from 'jsonwebtoken';

function getTokenValue(ctx: Context) {
  // JWT Header 格式
  // Authorization:Bearer tokenXXX
  const { authorization } = ctx.header;
  // 没有这个 header 直接返回false
  if (!ctx.header || !authorization) {
    return false;
  }
  if (typeof authorization === 'string') {
    const parts = authorization.trim().split(' ');
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        return credentials;
      }
      return false;
    }
    return false;
  }
  return false;
}

export default (options: EggAppConfig['jwt']) => {
  return async (ctx: Context, next: () => Promise<any>) => {
    // 从 header 获取对应的token
    const token = getTokenValue(ctx);
    if (!token) {
      return ctx.helper.error({ ctx, errorType: 'loginValidateFail' });
    }
    // 判断 secret 是否存在
    const { secret } = options;
    if (!secret) {
      throw new Error('Secre not provided');
    }
    try {
      const decoded = verify(token, secret);
      ctx.state.user = decoded;
      await next();
    } catch (e) {
      return ctx.helper.error({ ctx, errorType: 'loginValidateFail' });
    }
  };
};
```
### 在router.ts中调用中件间
```javascript
import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // 获取中间件
  const jwt = app.middleware.jwt({
    secret: app.config.jwt.secret,
  });
  router.get('/', controller.home.index);
  router.post('/api/users/create', controller.user.createByEmail);
  // 在这个路由上添加中间件
  router.get('/api/users/current', jwt, controller.user.show);
  router.post('/api/users/login', controller.user.loginByEmail);
};
```
### 修改 Controller 调用逻辑：
```javascript
  async show() {
    const { ctx, service } = this;
    const userData = await service.user.findByUsername(ctx.state.user.username);
    ctx.helper.success({ ctx, res: userData?.toJSON() });
  }
```