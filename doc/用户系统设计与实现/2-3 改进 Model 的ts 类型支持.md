### 第一种方式手工进行类型断言的方式

```
  async findById(id: string) {
    const currentUserModel = this.ctx.model.User as Model<UserProps>;
    const result = await currentUserModel.findById(id);
    if (result) {
      result.password;
    }
    return result;
  }
```


### 第二种方式自动获得Model的类型

* 自定义类型方式来行进重载处理

  ```
  import 'egg';
  import { Connection, Model } from 'mongoose';
  import { UserProps } from '../app/model/user';

  declare module 'egg' {
    interface MongooseModels {
      User: Model<UserProps>;
    }
  }

  ```
* 这样有一个问题，就是每增一个model类型文件就需在这个手功添加肯定是不现实的。
* ***[我可以通过扩展IModel 接口的方式来实现自动化获取mode类型]()***

  ```
  import 'egg';
  import { Connection, Model } from 'mongoose';

  declare module 'egg' {
    interface MongooseModels extends IModel {
      [key: string]: Model<any>;
    }
  }

  ```
