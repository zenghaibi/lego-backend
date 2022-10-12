import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // router 路由中调用中间件
  // const logger = app.middleware.myLogger(
  //   {
  //     allowedMethod: [ 'GET' ],
  //   },
  //   app,
  // );

  router.get('/', controller.home.index);
  router.post('/api/users/create', controller.user.createByEmail);
  router.get('/api/users/:id', controller.user.show);
};
