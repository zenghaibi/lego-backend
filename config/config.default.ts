import { join } from 'path';
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as dotenv from 'dotenv';

dotenv.config();
export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1664866044287_6647';

  // add your egg config in here
  // 配置自己写的中间件
  // config.middleware = ['customError'];
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // 配置debug调试等级
  config.logger = {
    consoleLevel: 'DEBUG',
  };
  // 配置模板引擎插件
  config.view = {
    defaultViewEngine: 'nunjucks',
  };
  // 配置自定义插件
  config.mongoose = {
    url: 'mongodb://localhost:27017/lego',
    options: {
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
  };
  config.bcrypt = {
    saltRounds: 10,
  };
  config.session = {
    encrypt: false,
  };
  config.jwt = {
    enable: true,
    secret: process.env.JWT_SECRET || '',
    match: [ '/api/users/getUserInfo', '/api/works' ],
  };
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };
  config.multipart = {
    // mode: 'file',
    // tmpdir: join(appInfo.baseDir, 'uploads'),
    whitelist: [ '.png', '.jpg', '.gif', '.webp' ],
    fileSize: '100kb',
  };
  config.static = {
    dir: [
      { prefix: '/public', dir: join(appInfo.baseDir, 'app/public') },
      { prefix: '/uploads', dir: join(appInfo.baseDir, 'uploads') },
    ],
  };
  config.cors = {
    origin: 'http://localhost:8080',
    allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH',
  };
  // 阿里云对象存储
  config.oss = {
    client: {
      accessKeyId: process.env.ALC_ACCESS_KEY || '',
      accessKeySecret: process.env.ALC_SECRET_KEY || '',
      bucket: 'hblego-backend',
      endpoint: 'oss-cn-chengdu.aliyuncs.com',
    },
  };
  // gitee oauth config
  const giteeOauthConfig = {
    cid: process.env.GITEE_CID,
    secret: process.env.GITEE_SECRET,
    redirectURL: 'http://localhost:7001/api/users/passport/gitee/callback',
    authURL: 'https://gitee.com/oauth/token?grant_type=authorization_code',
    giteeUserAPI: 'https://gitee.com/api/v5/user',
  };
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    myLogger: {
      allowedMethod: ['POST'],
    },
    // 发短信配置
    aliCloudConfig: {
      accessKeyId: process.env.ALC_ACCESS_KEY,
      accessKeySecret: process.env.ALC_SECRET_KEY,
      endpoint: 'dysmsapi.aliyuncs.com',
    },
    giteeOauthConfig,
    H5BaseURL: 'http://localhost:7001/api/pages',
    // baseUrl: 'default.url',
    // jwt: {
    //   secret: '1234567890',
    // },
    // 配置mongoose的连接地址
    // mongoose: {
    //   url: 'mongodb://localhost:27017/hello',
    // },
  };

  // the return config will combines to EggAppConfig
  return {
    ...(config as {}),
    ...bizConfig,
  };
};
