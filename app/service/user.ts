import { Service } from 'egg';
import { UserProps } from '../model/user';

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
}
