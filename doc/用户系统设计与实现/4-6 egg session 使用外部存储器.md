**1.第一步定义内定模型**（typings/index.d.ts）

```javascript
  // 定义一个内存模型
  interface Application {
    sessionMap: {
      [key: string]: any;
    };
    sessionStore: any;
  }
```

**2.第二步配置session**(/config/config.default.ts)

```javascript
  config.session = {
    encrypt: false,
  };
```

**3.第三步初化外部存储**(./app.ts)

```javascript
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
```

