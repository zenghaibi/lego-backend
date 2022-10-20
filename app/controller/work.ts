import { Controller } from 'egg';
const workCreateRules = {
  title: 'string',
};

export default class WorkController extends Controller {
  private validateWorkInput(rules: any) {
    const { ctx, app } = this;
    // ctx.validate(workCreateRules)
    const errors = app.validator.validate(rules, ctx.request.body);
    ctx.logger.warn(errors);
    return errors;
  }
  async createWork() {
    const { ctx, service } = this;
    const errors = this.validateWorkInput(workCreateRules);
    if (errors) {
      return ctx.helper.error({
        ctx,
        errorType: 'workValidateFail',
        error: errors,
      });
    }
    const workData = await service.work.createEmptyWork(ctx.request.body);
    ctx.helper.success({ ctx, res: workData });
  }
}
