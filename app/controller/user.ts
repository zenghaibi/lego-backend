import { Controller } from 'egg';
import validateInput from '../decorator/inputValidate';
const userCreateRules = {
  username: 'email',
  password: { type: 'password', min: 8 },
};
// 手机号输入验证规则
const sendCodeRules = {
  cellphone: {
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
    const { cellphone } = ctx.request.body;
    // 获取 redis 的数据
    // phoneVeriCode-18080220865
    const preVeriCode = await app.redis.get(`phoneVeriCode-${cellphone}`);
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
      // 调用啊里云短信服务发送验码
      const resp = await this.service.user.sendSMS(cellphone, veriCode);

      if (resp.body.code !== 'OK') {
        return ctx.helper.error({ ctx, errorType: 'sendVeriCodeError' });
      }
    }
    console.log(app.config.aliCloudConfig);
    // 模拟发送手机验码60秒内有效
    await app.redis.set(`phoneVeriCode-${cellphone}`, veriCode, 'ex', 60);
    ctx.helper.success({
      ctx,
      msg: '验证码发送成功',
      res: app.config.env === 'local' ? { veriCode } : null,
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
    const token = app.jwt.sign(
      { username: user.username },
      app.config.jwt.secret,
      {
        expiresIn: 60 * 60,
      },
    );
    ctx.helper.success({ ctx, res: { token }, msg: '登录成功' });
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
