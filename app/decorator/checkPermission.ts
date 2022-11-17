import { Controller } from 'egg';
import { GlobalErrorTypes } from '../error';
import defineRoles from '../roles/roles';
import { subject } from '@casl/ability';

// 将http中的方法与roles中的action作一一对应的mapping映设
const caslMethodMapping: Record<string,string> = {
  GET: 'read',
  POST: 'create',
  PATCH: 'update',
  DELETE: 'delete'
}

export default function checkPerimssion(
  modelName: string,
  errorType: GlobalErrorTypes,
  _userKey = 'user'
) {
  return function (_prototype, _key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const that = this as Controller;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { ctx } = that;
      const { id } = ctx.params;
      const { method } = ctx.request;
      const action = caslMethodMapping[method];
      if (!ctx.state && !ctx.state.user) {
        return ctx.helper.error({ ctx, errorType });
      }
      let permission = false;
      // 获取定义的 roles
      const ability = defineRoles(ctx.state.user);
      // 所以我们需要先获取role 来判断一下，看他是否存对应的条件
      const rule = ability.relevantRuleFor(action, modelName);
      console.log('rule:', rule);
      if (rule && rule.conditions) {
        // 假如存在 condition, 先查询对应的数据
        const certianRecord = await ctx.model[modelName].findOne({ id }).lean();
        permission = ability.can(action, subject(modelName, certianRecord));
      } else {
        permission = ability.can(action, modelName);
      }
      console.log('permission:',permission);
      if (!permission) {
        return ctx.helper.error({ ctx, errorType });
      }
      await originalMethod.apply(this, args);
    };
  };
}
