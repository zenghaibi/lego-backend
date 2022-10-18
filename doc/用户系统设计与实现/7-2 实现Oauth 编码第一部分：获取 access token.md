**1.第一步进行gitee oauth config 配置**

```javascript
// gitee oauth config
const giteeOauthConfig = {
  cid: process.env.GITEE_CID,
  secret: process.env.GITEE_SECRET,
  redirectURL: 'http://localhost:7001/api/users/passport/gitee/callback'
}
```

**2.创建路由，在controller添加一个oauth()**

```javascript
  async oauth() {
    const { app, ctx } = this;
    const { cid, redirectURL } = app.config.giteeOauthConfig;
    ctx.redirect(
      `https://gitee.com/oauth/authorize?client_id=${cid}&redirect_uri=${redirectURL}&response_type=code`,
    );
  }

```

**3.添加路由（route.ts）**

```javascript
  // gitee Oauth2
  router.get('/api/users/passport/gitee', controller.user.oauth);
```

#### 4.在service中添加获取token的post方法

```javascript
  async getAccessToken(code: string) {
    const { ctx, app } = this;
    const { cid, secret, redirectURL, authURL } = app.config.giteeOauthConfig;
    const { data } = await ctx.curl(authURL, {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      data: {
        code,
        client_id: cid,
        redirect_uri: redirectURL,
        client_secret: secret,
      },
    });
    app.logger.info(data);
    return data;
  }
```

#### 5.在controller中调用service中的getAccessToken()方法

```javascript
  async oauthByGitee() {
    const { ctx } = this;
    const { code } = ctx.request.query;
    const resp = await ctx.service.user.getAccessToken(code);
    if (resp) {
      ctx.helper.success({ ctx, res: resp });
    }
  }
```

#### 6.添加路由获取需要的token数据

```javascript
router.get('/api/users/passport/gitee/callback', controller.user.oauthByGitee);
```

**打印测试的结果：**

```javascript
{
"error": 0,
"data": {
"access_token": "c104ac26d6abc3d910e07a4cf8691d3b",
"token_type": "bearer",
"expires_in": 86400,
"refresh_token": "83d0924a4e4fcf65dd7c8c6c54f2c8201e62d9756dc78d7ab273abcd1cc3e7dc",
"scope": "user_info",
"created_at": 1666099644
},
"message": "请求成功"
}
```

#### API V5接口使用方式以及Url都参照GitHub，为了各位开发者更好的兼容已经存在的第三方应用。

### API 使用条款

* OSCHINA 用户是资源的拥有者，需尊重和保护用户的权益。
* 不能在应用中使用 OSCHINA 的名称。
* 未经用户允许，不准爬取或存储用户的资源。
* 禁止滥用 API，请求频率过快将导致请求终止。

### OAuth2 认证基本流程

![](https://gitee.com/assets/grape_swagger_rails/openapi-oauth2-flow.png)
