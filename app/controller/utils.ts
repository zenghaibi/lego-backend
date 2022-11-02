import { Controller } from 'egg';
import sharp from 'sharp';
import sendToWormhole from 'stream-wormhole';
import Busboy = require('busboy');
import { parse, join, extname } from 'path';
import { nanoid } from 'nanoid';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

export default class UtilsController extends Controller {
  // 上传到阿里云oss
  async uploadToOSS() {
    const { ctx, app } = this;
    const stream = await ctx.getFileStream();
    // hblogo-backend/hb-iot/**.ext
    const savedOSSPath = join('hb-iot', nanoid(6) + extname(stream.filename));
    try {
      const result = await ctx.oss.put(savedOSSPath, stream);
      app.logger.info(result);
      const { name, url } = result;
      ctx.helper.success({ ctx, res: { name, url } });
    } catch (error) {
      await sendToWormhole(stream);
      ctx.helper.error({ ctx, errorType: 'imageUploadFail' });
    }
  }

  uploadFileUseBusBoy() {
    const { app, ctx } = this;
    return new Promise<string[]>(resolve => {
      const busboy = new Busboy({ headers: ctx.req.headers as any });
      const results: string[] = [];
      busboy.on('file', (filedname, file, filename) => {
        app.logger.info(filedname, file, filename);
        const uid = nanoid(6);
        const savedFilePath = join(
          app.config.baseDir,
          'uploads',
          uid + extname(filename),
        );
        file.pipe(createWriteStream(savedFilePath));
        file.on('end', () => {
          results.push(savedFilePath);
        });
      });
      busboy.on('field', (fieldname, val) => {
        app.logger.info(fieldname, val);
      });
      busboy.on('finish', () => {
        app.logger.info('finished');
        resolve(results);
      });
      ctx.req.pipe(busboy);
    });
  }

  async testBsuBoy() {
    const { ctx } = this;
    const results = await this.uploadFileUseBusBoy();
    ctx.helper.success({ ctx, res: results });
  }

  async fileLocalUpload() {
    const { ctx, app } = this;
    const { filepath } = ctx.request.files[0];
    // 生成 sharp 实例
    const imageSource = sharp(filepath);
    const metaData = await imageSource.metadata();
    app.logger.debug(metaData);
    let thumbnailUrl = '';
    // 检查图片宽度是否大于300
    if (metaData.width && metaData.width > 300) {
      // geterate a new file path
      // uploads/**/abc.png => uploads/** */abc-thumbnail.png
      const { name, ext, dir } = parse(filepath);
      app.logger.debug(name, ext, dir);
      const thumbnailFilePath = join(dir, `${name}-thumbnail${ext}`);
      app.logger.debug(thumbnailFilePath);
      await imageSource.resize({ width: 300 }).toFile(thumbnailFilePath);
      thumbnailUrl = thumbnailFilePath.replace(
        app.config.baseDir,
        app.config.baseUrl
      );
    }
    const url = filepath.replace(app.config.baseDir, app.config.baseUrl);
    ctx.helper.success({
      ctx,
      res: { url, thumbnailUrl: thumbnailUrl ? thumbnailUrl : url },
    });
  }

  pathToURL(path: string) {
    const { app } = this;
    return path.replace(app.config.baseDir, app.config.baseUrl);
  }

  async fileUploadByStream() {
    const { ctx, app } = this;
    // 获上传文件的文件流
    const stream = await ctx.getFileStream();
    // 取随机长度6位的uid
    const uid = nanoid(6);
    // 确定上传文件的图片路径
    const savedFilePath = join(
      app.config.baseDir,
      'uploads',
      uid + extname(stream.filename)
    );
    // 确定上传文件图片缩略图片路径
    const savedThumbnailPath = join(
      app.config.baseDir,
      'uploads',
      uid + '_thumbnail' + extname(stream.filename)
    );
    // 创建写上传图片的写入流
    const target = createWriteStream(savedFilePath);
    // 创建写上传图片缩略图的写入流
    const target2 = createWriteStream(savedThumbnailPath);
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
      await Promise.all([savePromise, thumbnailPromise]);
    } catch (e) {
      return ctx.helper.error({ ctx, errorType: 'imageUploadFail' });
    }
    // 最终返回上传图片URL 及 缩略图的 thumbnailUrl
    ctx.helper.success({
      ctx,
      res: {
        url: this.pathToURL(savedFilePath),
        thumbnailUrl: this.pathToURL(savedThumbnailPath),
      },
    });
  }
}
