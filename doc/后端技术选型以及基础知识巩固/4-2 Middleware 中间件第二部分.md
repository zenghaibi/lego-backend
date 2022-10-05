### 中间件配置事项

* 1.在config目录下config.default.ts文件中添加自己中间件
  ```
    // add your egg config in here
    // 配置自己写的中间件
    config.middleware = [ 'myLogger' ];
  ```
* 2.添加配置信息
  ```
    // add your special config in here
    const bizConfig = {
      sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
      myLogger: {
        allowedMethod: [ 'POST' ],
      },
    };
  ```
* `3.在myLogger中间件中获配置信息进行业务逻辑处理`
* ```
  import { Context, Application } from 'egg';
  import { appendFileSync } from 'fs';
  export default (options: any, app: Application) => {
    return async (ctx: Context, next: () => Promise<any>) => {
      console.log('options', options);
      console.log('default options', app.config.logger);
      const startTime = Date.now();
      const requestTime = new Date();
      await next();
      const ms = Date.now() - startTime;
      const logTime = `${requestTime} -- ${ctx.method} -- ${ctx.url} -- ${ms}ms`;
      if (options.allowedMethod.includes(ctx.method)) {
        appendFileSync('./log.txt', logTime + '\n');
      }
    };
  };
  ```

#### 路由中使用中间件

```
import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // router 路由中调用中间件
  const logger = app.middleware.myLogger(
    {
      allowedMethod: [ 'GET' ],
    },
    app,
  );

  router.get('/', controller.home.index);
  router.get('/test/:id', controller.test.index);
  router.post('/test/:id', controller.test.index);
  router.get('/dog', logger, controller.test.getDog);
};

```
