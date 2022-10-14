### Token-based实现验证的模型

token一种最流行的实现方式JWT(json web token) https:jwt.io/

**示列代码(在login登录成功OK生成token并反回给客户端):**

```javascript
    // 生成token
    // Registered claims 注册关的信息
    // Public claims 公共信息:
    // should be unique like email, address or phone_number
    const token = sign({ username: user.username }, app.config.secret, {
      expiresIn: 60 * 60,
    });
    ctx.helper.success({ ctx, res: { token }, msg: '登录成功' });
```

**在客户端获取服务端发过来的token**

```javascript
  // 获取Token的值
  getTokenValue() {
    // JWT Header 格式
    // Authorization:Bearer tokenXX
    const { ctx } = this;
    const { authorization } = ctx.header;
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
```

**客户端获取到token后进行解密验证，是否已经登录**

```javascript
  async show() {
    const { ctx, app } = this;
    const token = this.getTokenValue();
    if (!token) {
      return ctx.helper.error({ ctx, errorType: 'loginValidateFail' });
    }
    try {
      const decoded = verify(token, app.config.secret);
      ctx.helper.success({ ctx, res: decoded });
    } catch (e) {
      return ctx.helper.error({ ctx, errorType: 'loginValidateFail' });
    }
  }
```