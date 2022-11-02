### 使用co-busboy完成多文件上传

```typescript
  async uploadMutipleFiles() {
    const { ctx, app } = this;
    const parts = ctx.multipart();
    // { urls: [ xxx, xxx ]}
    const urls: string[] = [];
    let part: FileStream | string[];
    while ((part = await parts())) {
      // 如果是 string [] 文体就不做处理
      if (Array.isArray(part)) {
        app.logger.info(part);
      } else {
        try {
          const savedOSSPath = join('hb-iot', nanoid(6) + extname(part.filename));
          const result = await ctx.oss.put(savedOSSPath, part);
          const { url } = result;
          urls.push(url);
        } catch (error) {
          // 异常将part给销毁掉
          await sendToWormhole(part);
          ctx.helper.error({ ctx, errorType: 'imageUploadFail' });
        }
      }
    }
    ctx.helper.success({ ctx, res: { urls } });
  }
```

![1667433421016](image/4-5使用co-busboy完成多文件上传的需求/1667433421016.png)
