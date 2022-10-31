**流的类型**

* Readable - 可读操作。
  ```typescript
  import { createReadStream } from 'fs';
  const readableSrc = createReadStream('./index.js');
  readableSrc.pipe(process.stdout);
  ```
* Writable - 可mM>Z.m-[xz?.x操z xx 作。
  ```typescript
  import { createReadStream,createWriteStream } from 'fs';
  const readableSrc = createReadStream('./index.js');
  const writeDesc = createWriteStream('./test.ts');
  readableSrc.pipe(writeDesc);
  ```
* Duplex - 可读可写操作.
* Transform - 操作被写入数据，然后读出结果。
  ```typescript
  // 压缩
  import { createReadStream,createWriteStream } from 'fs';
  import { createGzip } from 'zlib';   // 压缩
  const readableSrc = createReadStream('./index.js');
  const writeDesc = createWriteStream('./test.gz');
  readableSrc.pipe(createGzip()).pipe(writeDesc);

  // 解压
  import { createReadStream,createWriteStream } from 'fs';
  import { createGunzip } from 'zlib'; // 解压缩
  const readableSrc = createReadStream('./test.gz');
  const writeDesc = createWriteStream('./index.js');
  readableSrc.pipe(createGunzip()).pipe(writeDesc);
  ```

**流的流动**

![图片描述](https://img.mukewang.com/wiki/61cad90b09a9509518680916.jpg)

**流基于 EventEmitter，常见的事件有**

![图片描述](https://img.mukewang.com/wiki/61cad916092c68d708000459.jpg)

* data - 当有数据可读时触发。
* end - 没有更多的数据可读时触发。
  ```typescript
  import { createReadStream,createWriteStream } from 'fs';
  const readableSrc = createReadStream('./index.js');
  const writeDesc = createWriteStream('./test.ts');
  // readableSrc.pipe(writeDesc);
  readableSrc.on('data', chunk => {
    console.log('开始。。。')
    writeDesc.write(chunk);
  })
  readableSrc.on('end',() => {
    console.log('完成')
    writeDesc.end()
  })
  ```
* error - 在接收和写入过程中发生错误时触发。
* finish - 所有数据已被写入到底层系统时触发。
