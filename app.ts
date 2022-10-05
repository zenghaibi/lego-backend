import { IBoot, Application } from 'egg';

export default class AppBoot implements IBoot {
  private readonly app: Application;
  constructor(app: Application) {
    this.app = app;
  }
  // 配置文件即将加载，这是最后动态修改配置的时机（configWillLoad）同步
  configWillLoad(): void {
    // 此时config 文件读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    console.log('config', this.app.config.baseUrl);
    console.log('enable middleware', this.app.config.coreMiddleware);
    this.app.config.coreMiddleware.unshift('myLogger');
  }
  // 插件启动完毕（willReady) 异步
  async willReady() {
    console.log('enable willready', this.app.config.coreMiddleware);
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
