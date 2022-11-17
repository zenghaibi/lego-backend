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
  router.get('/api/users/getUserInfo', controller.user.show);
  router.post('/api/users/loginByEmail', controller.user.loginByEmail);
  // 生成手机验证码
  router.post('/api/users/genVeriCode', controller.user.sendVeriCode);
  // 手机号+短信验证码登录
  router.post(
    '/api/users/loginByPhoneNumber',
    controller.user.loginByCellphone,
  );
  // gitee Oauth2
  router.get('/api/users/passport/gitee', controller.user.oauth);
  router.get(
    '/api/users/passport/gitee/callback',
    controller.user.oauthByGitee,
  );

  router.post('/api/works', controller.work.createWork);
  router.get('/api/works', controller.work.myList);
  router.get('/api/works/:id', controller.work.myWork)
  router.get('/api/templates', controller.work.templateList);
  router.patch('/api/works/:id', controller.work.update);
  router.delete('/api/works/:id', controller.work.delete);
  router.post('/api/works/publish/:id', controller.work.publishWork);
  router.post('/api/works/publish-template/:id', controller.work.publishTemplate);

  router.post('/api/utils/upload', controller.utils.uploadMutipleFiles);
  router.get('/api/pages/:idAndUuid', controller.utils.renderH5Page);
  router.post('/api/channel', controller.work.createChannel);
  router.get('/api/channel/getWorkChannels/:id', controller.work.getWorkChannel);
  router.patch('/api/channel/updateName/:id', controller.work.updateChannelName);
  router.delete('/api/channel/:id', controller.work.deleteChannel);
};
