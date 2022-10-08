# 加载器（Loader）

Egg在Koa的基础上进行增强最重要的就是基于一定的约定，根据功能差异将代码放到

不同的目录下管理，对整体团队的开发成本提升有着明显的效果。Loader实现了这套

约定，并抽象了很多底层API可以进一步扩展。

// app.js

//  以下只是示例，加载controller 请用loadController

module.exports = app => {

    const directory = path.join(app.config.baseDir, 'app/controller');

    app.loader.loadToApp(directory, 'controller');

};

一共用三个参数：loadToApp(direcory, roperty, loaderOptions)

    1. directory 可以为String 或 Array, Loader会从这些目加载文件

    2. property 为 app的属性

    3. LoaderOptions 为一些配置

**loadToContext**

#### 与loadToapp 有一点差异，loadToContext 是加到ctx上而非app,而且是

#### 懒加载。加载时会将文件放到一个临时对象上，在调用ctx API时才实例化

#### 对象。比如servie的加载就是使用这种模式

```
  // 插件启动完毕（willReady) 异步
  async willReady() {
    console.log('enable willready', this.app.config.coreMiddleware);
    // app/model/user.ts => app.model.User
    const dir = join(this.app.config.baseDir, 'app/model');
    this.app.loader.loadToApp(dir, 'model', {
      caseStyle: 'upper',
    });
  }
```

### 类型定义

```
import 'egg';
import mongoose, { Connection, Model } from 'mongoose';

declare module 'egg' {
  type MongooseModel = {
    [key: string]: Model<any>;
  };
  interface Application {
    mongoose: Connection;
    model: MongooseModel;
  }
}
```

### 应用、框架和插件

Egg是一个底层框架，应可以直接使用，但Egg本身插件比较少，应用需要自己配置插件

增加各种特性，比如MySQL.

应用配置

// package.json

```

{
	"dependencies": {
		"egg": "^2.0.0",
		"egg-mysql": "^3.0.0",
	}
}
```
