import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.baseUrl = 'http://localhost:7001';

  // 2 配置 cors 允许的域名
  config.security = {
    domainWhiteList: ['*']
  }
  return config;
};
