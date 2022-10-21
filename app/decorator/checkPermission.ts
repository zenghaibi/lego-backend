import { Controller } from 'egg';
import { GlobErrorTypes } from '../error';
export default function checkPerimssion(
  modelName: string,
  errorType: GlobErrorTypes,
  userKey = 'user',
) {
  return function(_prototype, _key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      const that = this as Controller;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { ctx } = that;
      const { id } = ctx.params;
      const userId = ctx.state.user._id;
      const certianRecord = await ctx.model[modelName].findOne({ id });
      if (!certianRecord || certianRecord[userKey].toString() !== userId) {
        return ctx.helper.error({ ctx, errorType });
      }
      await originalMethod.apply(this, args);
    };
  };
}
