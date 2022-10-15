import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // 启动模版插件
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  // 启用egg-mongoose插件
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  // 启动egg-validate 数据验证的插件
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // 启动egg-bcrypt 加密插件
  bcrypt: {
    enable: true,
    package: 'egg-bcrypt',
  },
  // 启用egg-jwt 插件
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};

export default plugin;
