import { Controller } from 'egg';
import { version as appVersion} from '../../package.json';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const { status } = ctx.app.redis;
    const { version } = await ctx.app.mongoose.connection.db.command({
      buildInfo: 1,
    });
    ctx.helper.success({
      ctx,
      res: {
        dbVersion: version,
        redisStatus: status,
        appVersion,
        hello: '完成自动部署以及回滚的功能'
      },
    });
  }
}
