import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  // 启动模版插件
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  // 启用自定义插件
  hello: {
    enable: true,
    package: 'egg-hbzeng',
  },
};

export default plugin;
