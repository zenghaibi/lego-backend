```javascript
  async oauthByGitee() {
    const { ctx } = this;
    const { code } = ctx.request.query;
    try {
      const token = await ctx.service.user.loginByGitee(code);
      ctx.helper.success({ ctx, res: { token } });
    } catch (e) {
      return ctx.helper.error({ ctx, errorType: 'giteeOauthError' });
    }
  }
```

**1.修改model文件：**

```javascript
import { Application } from 'egg';
import { Schema } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
export interface UserProps {
  username: string;
  password: string;
  email?: string;
  nickName?: string;
  picture?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  type: 'email' | 'cellphone' | 'oauth';
  provider?: 'gitee';
  oauthID?: string;
}

function initUserModel(app: Application) {
  const AutoIncrement = AutoIncrementFactory(app.mongoose);
  const userSchema = new Schema<UserProps>(
    {
      username: { type: String, unique: true, required: true },
      password: { type: String },
      email: { type: String },
      nickName: { type: String },
      picture: { type: String },
      phoneNumber: { type: String },
      type: { type: String, default: 'email' },
      provider: { type: String },
      oauthID: { type: String },
    },
    {
      timestamps: true,
      toJSON: {
        transform(_doc, ret) {
          delete ret.password;
          delete ret.__v;
        },
      },
    },
  );
  userSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'users_id_counter' });
  return app.mongoose.model<UserProps>('User', userSchema);
}

export default initUserModel;

```

**2.修改service**

```javascript
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
```
