import { IBoot, Application } from 'egg';
// import { createConnection } from 'mongoose';
// import { join } from 'path';
// import * as assert from 'assert';

export default class AppBoot implements IBoot {
  private readonly app: Application;
  constructor(app: Application) {
    this.app = app;
    // 始初化
    app.sessionMap = {};
    app.sessionStore = {
      async get(key) {
        app.logger.info('key', key);
        return app.sessionMap[key];
      },
      async set(key, value) {
        app.logger.info('key', key);
        app.logger.info('value', value);
        app.sessionMap[key] = value;
      },
      async destroy(key) {
        delete app.sessionMap[key];
      },
    };
    // const { url } = this.app.config.mongoose;
    // assert.default(url, '[egg-mongoose] url is required on config');
    // const db = createConnection(url);
    // db.on('connected', () => {
    //   app.logger.info(`[egg-mongoose] ${url} connected successfully`);
    // });
    // app.mongoose = db;
  }
  // 配置文件即将加载，这是最后动态修改配置的时机（configWillLoad）同步
  configWillLoad(): void {
    // 此时config 文件读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // console.log('config', this.app.config.baseUrl);
    // console.log('enable middleware', this.app.config.coreMiddleware);
    // this.app.config.coreMiddleware.unshift('myLogger');
    // 添加 customError 中间件
    this.app.config.coreMiddleware.push('customError');
  }
  // 插件启动完毕（willReady) 异步
  async willReady() {
    console.log('enable willready', this.app.config.coreMiddleware);
    // app/model/user.ts => app.model.User
    // const dir = join(this.app.config.baseDir, 'app/model');
    // this.app.loader.loadToApp(dir, 'model', {
    //   caseStyle: 'upper',
    // });
  }
  // 应用已经启动完毕（didReady）异步
  async didReady(): Promise<void> {
    // 创建上下文对象
    const ctx = await this.app.createAnonymousContext();
    const res = await ctx.service.test.sayHi('kevin');
    console.log('did ready res', res);
    console.log('final middlewares', this.app.middleware);
  }
}
