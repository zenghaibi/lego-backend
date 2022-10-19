### 作品和公共模版

作品和模版是同的实体，只不过有着不同属性而已，作品支持增删改查

**作品**

* 创建空白作品POST /works
* 复制作品POST /works/copy/:id
* 获取我的作品或者模版列表/works?title=***&pageIndex=0&pageSize=4
* 获取单作品GET /works/:id
* 修改作品PATHCH /works/:id
* 删除作品 DELETE /works/:id
* 发布作品 POST /works/publish/:id
* 发布为模版 POST /works/publish-template/:id

**公共模版**

获取公共模版列表：GET /templates?title=***&pageIndex=0&pageSize=4

**渠道**

渠道是作品的子属性，一个作品可以有多个渠道。

### 创建Work Model

```javascript
import { Application } from 'egg';
import { ObjectId } from 'mongoose';
import { Schema } from 'mongoose';
import AutoIncrementFactory  from 'mongoose-sequence';
// import { UserProps } from './user';

export interface WorkProps {
  id?: number;
  uuid: string;
  title: string;
  desc: string;
  coverImg?: string;
  content?: { [key: string]: any };
  isTemplate?: boolean;
  isPublish?: boolean;
  isHot?: boolean;
  author: string;
  copiedCount: number;
  status?: 0 | 1 | 2;
  user: ObjectId;
}

module.exports = (app: Application) => {
  const AutoIncrement = AutoIncrementFactory(app.mongoose);
  const WorkSchema = new Schema<WorkProps>(
    {
      uuid: { type: String, unique: true },
      title: { type: String },
      desc: { type: String },
      coverImg: { type: String },
      content: { type: Object },
      isTemplate: { type: Boolean },
      isPublic: { type: Boolean },
      isHot: { type: Boolean },
      author: { type: String },
      copiedCount: { type: Number, default: 0 },
      status: { type: Number, default: 1 },
      user: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true },
  );
  WorkSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'works_id_counter' });
  return app.mongoose.model<WorkProps>('Work', WorkSchema);
};


```
