import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // 启动模版插件
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  // 启用自定义插件
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
};

export default plugin;
