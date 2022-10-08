# limit用法

```
    // limit 用法
    const options: FindOptions = {
      // limit: 2,
      // skip: 2
      // 1:升序 -1: 降序
      // sort: { age: -1 },
      // 控制那些字段不显示 0
      // projection: { _id: 0, age: 0, hobby: 0 },
      // 只显示某些字段
      projection: { name: 1 , _id: 0},
    };
    // 支链式写法
    const results = await userCollection
      .find({ age: { $type: 'number' } }, options).sort({age: 1})
      .toArray();
    console.log(results);
```
