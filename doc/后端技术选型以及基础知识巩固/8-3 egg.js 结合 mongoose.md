# ## Egg.js 与 mongoose结合*

* .npm i mongoose -- save 安装
* 
* 2. 在config.default.ts 文件配置mongodb 的url 地址
     ```
       const bizConfig = {
         sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
         myLogger: {
           allowedMethod: ['POST'],
         },
         baseUrl: 'default.url',
         // 配置mongoose的连接地址
         mongoose: {
           url: 'mongodb://localhost:27017/hello',
         },
       };
     ```

在程序启动：初始化数据库实例并绑定到.app上

```
export default class AppBoot implements IBoot {
  private readonly app: Application;
  constructor(app: Application) {
    this.app = app;
    const { url } = this.app.config.mongoose;
    assert.default(url, '[egg-mongoose] url is required on config');
    const db = createConnection(url);
    db.on('connected', () => {
      app.logger.info(`[egg-mongoose] ${url} connected successfully`);
    });
    app.mongoose = db;
  }
```

特别注意用的createConnect() 方法创一个实例对象

app.mongoose = db; 需要修改ts定义文件

```
import 'egg';
import mongoose, { Connection } from 'mongoose';

declare module 'egg' {
  interface Application {
    mongoose: Connection;
  }
}
```

**注意(model是取mongoose实例上model ：[return app.mongoose.model(&#39;User&#39;, UserSchema);]())**

```
  private getPersonModel() {
    const app = this.app;
    const UserSchema = new Schema(
      {
        name: { type: String },
        age: { type: Number },
        hobbies: { type: Array },
        team: { type: Schema.Types.ObjectId, ref: 'Team' },
      },
      { collection: 'user' },
    );
    return app.mongoose.model('User', UserSchema);
  }

  async showPlayers() {
    const PersonModel = this.getPersonModel();
    const result = await PersonModel.find({ age: { $lt: 40 } }).exec();
    return result;
  }
```
