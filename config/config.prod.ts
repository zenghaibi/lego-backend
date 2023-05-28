import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.baseUrl = 'prod.url';
  // 1.给 mongoDB 和 redis 添加密码 待办项
  // config.mongoose = {
  //   client: {
  //     url: 'xxx',
  //     options: {
  //       dbName: 'lego',
  //       user: 'xyz',
  //       pass: 'pass'
  //     }
  //   }
  // }
  config.mongoose = {
    url: 'mongodb://lego-mongo:27017/lego',
    options: {
      user: process.env.MONGO_DB_USERNAME,
      pass: process.env.MONGO_DB_PASSWORD,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  };
  config.redis = {
    client: {
      port: 6379,
      host: 'lego-redis',
      password: process.env.REDIS_PASSWORD,
      db: 0
    }
  }

  // 2 配置 cors 允许的域名
  config.security = {
    xframe: {
      enable: false,
    },
    domainWhiteList: ['*']
  }
  // 3 配置生产token的失效时间为 2 天
  config.jwtExpires = '2 days';
  // 4 本地的URL 替换
  config.giteeOauthConfig = { 
    redirectURL: 'http://api.imooc-lego.com/api/users/passport/gitee/callback'
  }
  config.H5BaseURL = 'http://114.116.94.125:7002';
  return config;
};
