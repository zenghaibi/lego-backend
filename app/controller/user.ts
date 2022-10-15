import { Controller } from 'egg';
// import { sign } from 'jsonwebtoken';
const userCreateRules = {
  username: 'email',
  password: { type: 'password', min: 8 },
};
export const userErrorMessages = {
  userValidateFail: {
    errno: 101001,
    message: '输入信息验证失败',
  },
  // 创建用户，写入数据库，规败
  createUserAlreadyExists: {
    errno: 101002,
    message: '该邮箱已经被注册，请直接登录',
  },
  // 用户不存在或者密码错误
  loginCheckFailInfo: {
    errno: 101003,
    message: '该用户不存或者密码错误',
  },
  loginValidateFail: {
    errno: 101004,
    message: '登录检验失败',
  },
};
export default class UserController extends Controller {
  async createByEmail() {
    const { ctx, service } = this;
    // 检查用户的输入
    const error = this.vaildateUserInput();
    if (error) {
      return ctx.helper.error({ ctx, errorType: 'userValidateFail', error });
    }
    const { username } = ctx.request.body;
    const user = await service.user.findByUsername(username);
    if (user) {
      return ctx.helper.error({ ctx, errorType: 'createUserAlreadyExists' });
    }
    const userData = await service.user.createByEmail(ctx.request.body);
    ctx.helper.success({ ctx, res: userData });
  }
  vaildateUserInput() {
    const { ctx, app } = this;
    const errors = app.validator.validate(userCreateRules, ctx.request.body);
    ctx.logger.warn(errors);
    return errors;
  }
  async loginByEmail() {
    const { ctx, service, app } = this;
    // 检查用户的输入
    const error = this.vaildateUserInput();
    if (error) {
      return ctx.helper.error({ ctx, errorType: 'userValidateFail', error });
    }
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
    // const userObj = user.toJSON() as any;
    // delete userObj.password;

    // cookie 使用
    // ctx.cookies.set('username', user.username, { encrypt: true });

    // 设置session
    // ctx.session.username = user.username;

    // 生成token
    // Registered claims 注册关的信息
    // Public claims 公共信息:
    // should be unique like email, address or phone_number
    const token = app.jwt.sign(
      { username: user.username },
      app.config.jwt.secret,
      {
        expiresIn: 60 * 60,
      },
    );
    ctx.helper.success({ ctx, res: { token }, msg: '登录成功' });
  }
  // 获取Token的值
  // getTokenValue() {
  //   // JWT Header 格式
  //   // Authorization:Bearer tokenXX
  //   const { ctx } = this;
  //   const { authorization } = ctx.header;
  //   if (!ctx.header || !authorization) {
  //     return false;
  //   }
  //   if (typeof authorization === 'string') {
  //     const parts = authorization.trim().split(' ');
  //     if (parts.length === 2) {
  //       const scheme = parts[0];
  //       const credentials = parts[1];
  //       if (/^Bearer$/i.test(scheme)) {
  //         return credentials;
  //       }
  //       return false;
  //     }
  //     return false;
  //   }
  //   return false;
  // }
  async show() {
    // const { ctx, app } = this;
    // const { username } = ctx.session;
    // /users/:id
    // const userData = await service.user.findById(ctx.params.id);
    // const username = ctx.cookies.get('username', { encrypt: true });

    // const token = this.getTokenValue();
    // if (!token) {
    //   return ctx.helper.error({ ctx, errorType: 'loginValidateFail' });
    // }
    // try {
    //   const decoded = verify(token, app.config.secret);
    //   ctx.helper.success({ ctx, res: decoded });
    // } catch (e) {
    //   return ctx.helper.error({ ctx, errorType: 'loginValidateFail' });
    // }
    // if (!username) {
    //   return ctx.helper.error({ ctx, errorType: 'loginValidateFail' });
    // }
    // ctx.helper.success({ ctx, res: username });
    const { ctx, service } = this;
    const userData = await service.user.findByUsername(ctx.state.user.username);
    ctx.helper.success({ ctx, res: userData?.toJSON() });
  }
}
