**使用pipeline原来方式进行改进**

```typescript
    /*
    // 用Promise方式来操作stream流读写操作
    const savePrommise = new Promise((resolve, reject) => {
      stream.pipe(target).on('finish', resolve).on('error', reject);
    });
    // 生成一个图片缩略图的转换流
    const transformer = sharp().resize({ width: 300 });
    // 让stream.pipe(到一个转换流中去).pipe(缩略图的可写流中)
    const thumbnailPromise = new Promise((resolve, reject) => {
      stream
        .pipe(transformer)
        .pipe(target2)
        .on('finish', resolve)
        .on('error', reject);
    });

    // 调用await 全部 Promise
    await Promise.all([ savePrommise, thumbnailPromise ]);
    */
    // 采用pipeline自带promise自写法
    const savePromise = pipeline(stream, target);
    const transformer = sharp().resize({ width: 300 });
    const thumbnailPromise = pipeline(stream, transformer, target2);
    try {
      await Promise.all([ savePromise, thumbnailPromise ]);
    } catch (e) {
      return ctx.helper.error({ ctx, errorType: 'imageUploadFail' });
    }
```
