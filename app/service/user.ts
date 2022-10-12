import { Service } from 'egg';
import { UserProps } from '../model/user';

export default class UserService extends Service {
  public async createByEmail(playload: UserProps) {
    const { ctx } = this;
    const { username, password } = playload;
    const userCreateData: Partial<UserProps> = {
      username,
      password,
      email: username,
    };
    return ctx.model.User.create(userCreateData);
  }
  async findById(id: string) {
    return this.ctx.model.User.findById(id);
  }
}
