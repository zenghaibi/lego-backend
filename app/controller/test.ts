import { Controller } from 'egg';

export default class TestController extends Controller {
  async index() {
    const { ctx } = this; // 当前请求上下文
    const { id } = ctx.params;
    const { query, body } = ctx.request;
    const { baseUrl } = ctx.app.config;
    const resp = {
      query,
      id,
      body,
      baseUrl,
    };
    ctx.body = resp;
    ctx.status = 200;
  }
  async getDog() {
    const { service, ctx } = this;
    const resp = await service.dog.show();
    // ctx.body = resp.message;
    // ctx.status = 200;
    await ctx.render('test.nj', { url: resp.message });
  }
}
