import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // 注释掉手工生成中间件
  // const jwt = app.middleware.jwt({
  //   secret: app.config.jwt.secret,
  // });
  router.get('/', controller.home.index);
  router.post('/api/users/create', controller.user.createByEmail);
  // 这里使用egg-jwt 插件 (app.jwt 这里没有定义类文件所以直接断言成 any)
  router.get('/api/users/getUserInfo', app.jwt as any, controller.user.show);
  router.post('/api/users/loginByEmail', controller.user.loginByEmail);
};
