import { Controller } from 'egg';
import validateInput from '../decorator/inputValidate';
const userCreateRules = {
  username: 'email',
  password: { type: 'password', min: 8 },
};
// 手机号输入验证规则
const sendCodeRules = {
  phoneNumber: {
    type: 'string',
    format: /^1[3-9]\d{9}$/,
    message: '手机号码格式错误',
  },
};
const userPhoneCreateRules = {
  phoneNumber: {
    type: 'string',
    format: /^1[3-9]\d{9}$/,
    message: '手机号码格式错误',
  },
  veriCode: { type: 'string', format: /^\d{4}$/, message: '验证码格式错误' },
};

export default class UserController extends Controller {
  @validateInput(userCreateRules, 'userValidateFail')
  async createByEmail() {
    const { ctx, service } = this;
    const { username } = ctx.request.body;
    const user = await service.user.findByUsername(username);
    if (user) {
      return ctx.helper.error({ ctx, errorType: 'createUserAlreadyExists' });
    }
    const userData = await service.user.createByEmail(ctx.request.body);
    ctx.helper.success({ ctx, res: userData });
  }
  // 发送手机验证吗
  @validateInput(sendCodeRules, 'userValidateFail')
  async sendVeriCode() {
    const { ctx, app } = this;
    const { phoneNumber } = ctx.request.body;
    // 获取 redis 的数据
    // phoneVeriCode-18080220865
    const preVeriCode = await app.redis.get(`phoneVeriCode-${phoneNumber}`);
    console.log(preVeriCode);
    // 判断是否存在
    if (preVeriCode) {
      return ctx.helper.error({
        ctx,
        errorType: 'sendVeriCodeFrequentlyFailInfo',
      });
    }
    // 创建随机4位数的手机验证码
    // [0 - 1]
    // [0 - 1] * 9000 = [0 - 9000]
    // [(0 - 9000) + 1000 = [1000, 10000]
    const veriCode = Math.floor(Math.random() * 9000 + 1000).toString();
    // 发送短信
    // 判断是否为生产环境
    if (app.config.env === 'prod') {
      // 调用啊里云短信服务发送验码(注掉是为省短息费用) 正式发布记得改回来
      // const resp = await this.service.user.sendSMS(cellphone, veriCode);

      // if (resp.body.code !== 'OK') {
      //   return ctx.helper.error({ ctx, errorType: 'sendVeriCodeError' });
      // }
    }
    console.log(app.config.aliCloudConfig);
    // 模拟发送手机验码60秒内有效
    await app.redis.set(`phoneVeriCode-${phoneNumber}`, veriCode, 'ex', 60);
    ctx.helper.success({
      ctx,
      msg: '后端发送的验证码发送成功',
      res: app.config.env === 'local' ? { veriCode } : { veriCode }, // 正式发布记得改回来
    });
  }
  @validateInput(userCreateRules, 'userValidateFail')
  async loginByEmail() {
    const { ctx, service, app } = this;
    // 根据 username 取得用户信息
    const { username, password } = ctx.request.body;
    const user = await service.user.findByUsername(username);
    // 检查用户是否存在
    if (!user) {
      return ctx.helper.error({ ctx, errorType: 'loginCheckFailInfo' });
    }
    // 进行解密处理
    const verifyPwd = await ctx.compare(password, user.password);
    // 验证密码是成功
    if (!verifyPwd) {
      return ctx.helper.error({ ctx, errorType: 'loginCheckFailInfo' });
    }
    const id = user.id
    const token = app.jwt.sign(
      { username: user.username, _id: user._id },
      app.config.jwt.secret,
      {
        expiresIn: 60 * 60,
      },
    );
    ctx.helper.success({ ctx, res: { id, token }, msg: '登录成功' });
  }
  // 获取用户例表
  async userList() {
    const { ctx } = this;
    // const { pageIndex, pageSize } = ctx.query;
    // const listCondition: IndexCondition = {
    //   select: 'id uuid title desc contentId publishContentId author coverImg isTemplate status copiedCount latestPublishAt isHot isNew orderIndex isPublic createdAt updatedAt',
    //   populate: { path: 'user', select: 'username nickName gender picture' },
    //   find: { isPublic: true, isTemplate: true },
    //   ...(pageIndex && { pageIndex: parseInt(pageIndex) }),
    //   ...(pageSize && { pageSize: parseInt(pageSize) }),
    // };

    // const res = await ctx.service.work.getList(listCondition);
    // 先用模拟数据进行测试完成前端功能
    const test = [
      {
        "type" : "email",
        "username" : "289797421@qq.com",
        "email" : "289797421@qq.com",
        "nickName" : "sea",
        "createdAt" : "2022-10-20T15:08:57.487Z",
        "updatedAt" : "2022-10-20T15:08:57.487Z",
        "id" : 1,
      },
      {
        "type" : "cellphone",
        "username" : "18080220865",
        "phoneNumber" : "18080220865",
        "nickName" : "HB0865",
        "createdAt" : "2022-10-20T15:09:51.007Z",
        "updatedAt" : "2022-10-20T15:09:51.007Z",
        "id" : 2
      },
      {
        "type" : "oauth",
        "oauthID" : "1968524",
        "provider" : "gitee",
        "username" : "Gitee1968524",
        "picture" : "https://gitee.com/assets/no_portrait.png",
        "nickName" : "Admin",
        "email" : null,
        "createdAt" : "2022-10-20T15:12:22.787Z",
        "updatedAt" : "2022-10-20T15:12:22.787Z",
        "id" : 3
      },
      {
        "type" : "email",
        "username" : "linuxangel@126.com",
        "email" : "linuxangel@126.com",
        "nickName" : "linuxangel",
        "createdAt" : "2022-10-21T05:02:56.832Z",
        "updatedAt" : "2022-10-21T05:02:56.832Z",
        "id" : 4
      },
      {
        "type" : "email",
        "role" : "normal",
        "username" : "33278908@qq.com",
        "email" : "33278908@qq.com",
        "nickName" : "lin",
        "createdAt" : "2023-06-07T09:41:26.490Z",
        "updatedAt" : "2023-06-07T09:41:26.490Z",
        "id" : 5,
      },
      {
        "type" : "email",
        "role" : "normal",
        "username" : "4954962@qq.com",
        "email" : "4954962@qq.com",
        "nickName" : "姚杰",
        "createdAt" : "2023-06-07T09:44:49.667Z",
        "updatedAt" : "2023-06-07T09:44:49.667Z",
        "id" : 6
      },
      {
        "type" : "email",
        "role" : "normal",
        "username" : "2427041225@qq.com",
        "email" : "2427041225@qq.com",
        "nickName" : "黄老师",
        "createdAt" : "2023-06-07T09:46:37.406Z",
        "updatedAt" : "2023-06-07T09:46:37.406Z",
        "id" : 7
      },
      {
        "type" : "email",
        "role" : "normal",
        "username" : "3395044775@qq.com",
        "email" : "3395044775@qq.com",
        "nickName" : "缺缺",
        "createdAt" : "2023-06-07T09:48:26.107Z",
        "updatedAt" : "2023-06-07T09:48:26.107Z",
        "id" : 8
      },
      {
        "type" : "cellphone",
        "role" : "normal",
        "username" : "18990583885",
        "phoneNumber" : "18990583885",
        "nickName" : "HB3885",
        "createdAt" : "2023-06-07T09:54:02.336Z",
        "updatedAt" : "2023-06-07T09:54:02.336Z",
        "id" : 9
      },
      {
        "type" : "email",
        "role" : "normal",
        "username" : "361236987@qq.com",
        "email" : "361236987@qq.com",
        "nickName" : "康讯",
        "createdAt" : "2023-06-07T09:58:15.429Z",
        "updatedAt" : "2023-06-07T09:58:15.429Z",
        "id" : 10
      },
      {
        "type" : "email",
        "role" : "normal",
        "username" : "17562828@qq.com",
        "email" : "17562828@qq.com",
        "nickName" : "张军",
        "createdAt" : "2023-06-07T10:00:56.225Z",
        "updatedAt" : "2023-06-07T10:00:56.225Z",
        "id" : 11
      }
    ];
    const res = {
      list: test,
      count: 11
    }
    ctx.helper.success({ ctx, res });
  }
  // 手机登录
  @validateInput(userPhoneCreateRules, 'userValidateFail')
  async loginByCellphone() {
    const { ctx, app } = this;
    const { phoneNumber, veriCode } = ctx.request.body;
    // 验证码是否正确
    const preVeriCode = await app.redis.get(`phoneVeriCode-${phoneNumber}`);
    if (veriCode !== preVeriCode) {
      return ctx.helper.error({
        ctx,
        errorType: 'loginVeriCodeIncorrectFailInfo',
      });
    }
    const token = await ctx.service.user.loginByCellphone(phoneNumber);
    ctx.helper.success({ ctx, res: { token } });
  }
  async oauth() {
    const { app, ctx } = this;
    const { cid, redirectURL } = app.config.giteeOauthConfig;
    ctx.redirect(
      `https://gitee.com/oauth/authorize?client_id=${cid}&redirect_uri=${redirectURL}&response_type=code`,
    );
  }
  async oauthByGitee() {
    const { ctx } = this;
    const { code } = ctx.request.query;
    try {
      const token = await ctx.service.user.loginByGitee(code);
      await ctx.render('success.nj', { token });
      // ctx.helper.success({ ctx, res: { token } });
    } catch (e) {
      return ctx.helper.error({ ctx, errorType: 'giteeOauthError' });
    }
  }
  async show() {
    const { ctx, service } = this;
    const userData = await service.user.findByUsername(ctx.state.user.username);
    ctx.helper.success({ ctx, res: userData?.toJSON() });
  }
}
