import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1664866044287_6647';

  // add your egg config in here
  // 配置自己写的中间件
  config.middleware = [ 'customError' ];
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
  };
  config.bcrypt = {
    saltRounds: 10,
  };
  config.session = {
    encrypt: false,
  };
  config.jwt = {
    secret: '1234567890',
  };
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    myLogger: {
      allowedMethod: [ 'POST' ],
    },
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
