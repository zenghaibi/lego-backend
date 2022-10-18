import { Service } from 'egg';
import { UserProps } from '../model/user';
import * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';

interface GiteeUserResp {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  email: string;
}

export default class UserService extends Service {
  public async createByEmail(playload: UserProps) {
    const { ctx } = this;
    const { username, password, nickName } = playload;
    const hash = await ctx.genHash(password);
    const userCreateData: Partial<UserProps> = {
      username,
      password: hash,
      email: username,
      nickName,
    };
    return ctx.model.User.create(userCreateData);
  }
  async findById(id: string) {
    const result = await this.ctx.model.User.findById(id);
    if (result) {
      result.password;
    }
    return result;
  }
  async findByUsername(username: string) {
    return await this.ctx.model.User.findOne({ username });
  }
  // 可里云短信云发送手机验证码
  async sendSMS(phoneNumber: string, veriCode: string) {
    const { app } = this;
    // 配置参数
    console.log(phoneNumber);
    console.log(veriCode);
    const sendSMSRequest = new $Dysmsapi20170525.SendSmsRequest({
      signName: '阿里云短信测试',
      templateCode: 'SMS_154950909',
      phoneNumbers: phoneNumber,
      templateParam: `{\"code\":\"${veriCode}\"}`,
    });
    console.log('测试1', sendSMSRequest);
    const resp = await app.ALClient.sendSms(sendSMSRequest);
    return resp;
  }
  async loginByCellphone(cellphone: string) {
    const { ctx, app } = this;
    const user = await this.findByUsername(cellphone);
    // 检查 user 记录是否存在
    if (user) {
      // getnerate token
      const token = app.jwt.sign(
        { username: user.username },
        app.config.jwt.secret
      );
      return token;
    }
    // 新建一个用户
    const userCreatedData: Partial<UserProps> = {
      username: cellphone,
      phoneNumber: cellphone,
      nickName: `HB${cellphone.slice(-4)}`,
      type: 'cellphone',
    };
    const newUser = await ctx.model.User.create(userCreatedData);
    const token = app.jwt.sign(
      { username: newUser.username },
      app.config.jwt.secret
    );
    return token;
  }
  // get access token
  async getAccessToken(code: string) {
    const { ctx, app } = this;
    const { cid, secret, redirectURL, authURL } = app.config.giteeOauthConfig;
    const { data } = await ctx.curl(authURL, {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      data: {
        code,
        client_id: cid,
        redirect_uri: redirectURL,
        client_secret: secret,
      },
    });
    app.logger.info(data);
    return data.access_token;
  }
  // get gitee user data
  async getGiteeUserData(access_token: string) {
    const { ctx, app } = this;
    const { giteeUserAPI } = app.config.giteeOauthConfig;
    const { data } = await ctx.curl<GiteeUserResp>(
      `${giteeUserAPI}?access_token=${access_token}`,
      {
        dataType: 'json',
      }
    );
    return data;
  }
  async loginByGitee(code: string) {
    const { ctx, app } = this;
    // 获取 access_token
    const accessToken = await this.getAccessToken(code);
    // 获取用户的信息
    const user = await this.getGiteeUserData(accessToken);
    // 检查用户信息是否存
    const { id, name, avatar_url, email } = user;
    const stringId = id.toString();
    // Gitee + id
    // Github + id
    // WX + id
    // 假如用户存在，直接返回token
    const existUser = await this.findByUsername(`Gitee${stringId}`);
    if (existUser) {
      const token = app.jwt.sign(
        { username: existUser.username },
        app.config.jwt.secret,
      );
      return token;
    }
    // 假如用不户存在，新建用户
    const userCreateData: Partial<UserProps> = {
      oauthID: stringId,
      provider: 'gitee',
      username: `Gitee${stringId}`,
      picture: avatar_url,
      nickName: name,
      email,
      type: 'oauth',
    };
    const newUser = await ctx.model.User.create(userCreateData);
    const token = app.jwt.sign(
      { username: newUser.username },
      app.config.jwt.secret,
    );
    return token;
  }
}
