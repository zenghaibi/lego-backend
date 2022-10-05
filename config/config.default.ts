import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1664866044287_6647';

  // add your egg config in here
  // 配置自己写的中间件
  config.middleware = [ ];
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // 配置模板引擎插件
  config.view = {
    defaultViewEngine: 'nunjucks',
  };
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    myLogger: {
      allowedMethod: [ 'POST' ],
    },
    baseUrl: 'default.url',
  };

  // the return config will combines to EggAppConfig
  return {
    ...config as {},
    ...bizConfig,
  };
};
