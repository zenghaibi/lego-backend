import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // 注释掉手工生成中间件
  // const jwt = app.middleware.jwt({
  //   secret: app.config.jwt.secret,
  // });
  router.get('/ping', controller.home.index);
  router.prefix('/api');
  router.post('/users/create', controller.user.createByEmail);
  // 这里使用egg-jwt 插件 (app.jwt 这里没有定义类文件所以直接断言成 any)
  router.get('/users/getUserInfo', controller.user.show);
  router.post('/users/loginByEmail', controller.user.loginByEmail);
  // 获取用户列表
  router.post('/user/list', controller.user.userList);
  // 系统菜单
  router.get('/menu', controller.menu.index);
  // 生成手机验证码
  router.post('/users/genVeriCode', controller.user.sendVeriCode);
  // 手机号+短信验证码登录
  router.post(
    '/users/loginByPhoneNumber',
    controller.user.loginByCellphone,
  );
  // gitee Oauth2
  router.get('/users/passport/gitee', controller.user.oauth);
  router.get(
    '/users/passport/gitee/callback',
    controller.user.oauthByGitee,
  );

  router.post('/works', controller.work.createWork);
  router.get('/works', controller.work.myList);
  router.get('/works/:id', controller.work.myWork)
  router.get('/templates', controller.work.templateList);
  router.patch('/works/:id', controller.work.update);
  router.delete('/works/:id', controller.work.delete);
  router.post('/works/publish/:id', controller.work.publishWork);
  router.post('/works/publish-template/:id', controller.work.publishTemplate);

  router.post('/utils/upload', controller.utils.uploadToOSS);
  router.get('/pages/:idAndUuid', controller.utils.renderH5Page);
  router.post('/channel', controller.work.createChannel);
  router.get('/channel/getWorkChannels/:id', controller.work.getWorkChannel);
  router.patch('/channel/updateName/:id', controller.work.updateChannelName);
  router.delete('/channel/:id', controller.work.deleteChannel);
};
