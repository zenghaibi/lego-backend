1. 安装egg-bcrypt插件
   ```javascript
      npm i egg-bcrypt --save
   ```
2. 启用bcrypt 插件 (/config/plugin.ts)

```javasxript
  // 启动egg-bcrypt 加密插件
  bcrypt: {
    enable: true,
    package: 'egg-bcrypt',
  },
```

3. 定义类型文件（/typings/index.d.ts）

```javascript
import 'egg';
import { Connection, Model } from 'mongoose';

declare module 'egg' {
  interface MongooseModels extends IModel {
    [key: string]: Model<any>;
  }

  interface Context {
    genHash(plainText: string): Promise<string>;
    compare(plainText: string, hash: string): Promise<boolean>;
  }

  interface EggAppConfig {
    bcrypt: {
      saltRounds: number;
    }
  }
}
```
4. 进行配置(/config/config.defautl.ts)
``` javascript
  config.bcrypt = {
    saltRounds: 10,
  };
```

5. 进行加密的示例代码：
``` javascript
  public async createByEmail(playload: UserProps) {
    const { ctx } = this;
    const { username, password } = playload;
    // 对password进行加密处理
    const hash = await ctx.genHash(password);
    const userCreateData: Partial<UserProps> = {
      username,
      password: hash,
      email: username,
    };
    return ctx.model.User.create(userCreateData);
  }

```
6. 进行解密的的示例代码:
``` javascript 

  async loginByEmail() {
    const { ctx, service } = this;
    // 检查用户的输入
    const error = this.vaildateUserInput();
    if (error) {
      return ctx.helper.error({ ctx, errorType: 'userValidateFail', error });
    }
    // 根据 username 取得用户信息
    const { username, password } = ctx.request.body;
    const user = await service.user.findByUsername(username);
    // 检查用户是否存在
    if (!user) {
      return ctx.helper.error({ ctx, errorType: 'loginCheckFailInfo' });
    }
    // 进行解密处理
    const verifyPwd = await ctx.compare(password, user.password);
    // 验证密码是成功
    if (!verifyPwd) {
      return ctx.helper.error({ ctx, errorType: 'loginCheckFailInfo' });
    }
    ctx.helper.success({ ctx, res: user, msg: '登录成功' });
  }

```