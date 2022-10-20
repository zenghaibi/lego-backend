import { GlobErrorTypes } from '../error';
import { Controller } from 'egg';
// 创建工厂函数传入 rules 和 errorType
export default function validateInput(rules: any, errorType: GlobErrorTypes) {
  return function(_prototype, _key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
      const that = this as Controller;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { ctx, app } = that;
      const errors = app.validator.validate(rules, ctx.request.body);
      if (errors) {
        return ctx.helper.error({ ctx, errorType, error: errors });
      }
      return originalMethod.apply(this, args);
    };
  };
}
