### Demo 代码

```
import { connect, Schema, model, disconnect } from 'mongoose';
async function main() {
  try {
    await connect('mongodb://localhost:27017/hello');
    console.log('[egg-mongoose] connected successfully');
    const ProductSchema = new Schema({
      name: { type: String },
      price: { type: Number },
    });
    const ProductModel = model('Product',ProductSchema);
    const result = await ProductModel.create({
      name: '苹果14手机',
      price: 3500
    })
    const ipad = new ProductModel({
      name: 'ipad',
      price: 4500
    })
    await ipad.save()
    // result.save()
    console.log(ipad)
  } catch (e) {
    console.error(e);
  } finally {
    await disconnect()
  }
}
main()

```

# 现有数据表进行OMD 示例代码如下

```
    const UserScheam = new Schema({
      name: { type: String },
      age: { type: Number },
      hobbies: { type: Array },
      team: { type: Schema.Types.ObjectId, ref: 'Team' },
    }, {collection: 'user'});
    const UserModel = model('User', UserScheam)
    const result = await UserModel.find({ age: { $lt: 40 }}).exec()
    console.log(result);
```
