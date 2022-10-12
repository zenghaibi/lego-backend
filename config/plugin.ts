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
};

export default plugin;
