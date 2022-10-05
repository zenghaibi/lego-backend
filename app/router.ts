import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // router 路由中调用中间件
  const logger = app.middleware.myLogger(
    {
      allowedMethod: [ 'GET' ],
    },
    app,
  );

  router.get('/', controller.home.index);
  router.get('/test/:id', controller.test.index);
  router.post('/test/:id', controller.test.index);
  router.get('/dog', logger, controller.test.getDog);
};
