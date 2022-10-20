import { Controller } from 'egg';
import validateInput from '../decorator/inputValidate';
const workCreateRules = {
  title: 'string',
};
/*
### 查询列表的可变条件
* 页数
* 每页多少条记录返回哪些值 - projection / select
* 关联哪些集合以及返回哪些值 - $lookup/populate
* 排序 - sort = { key: value }
* 查询条件 - query = { key: value }
*/
// 查询条件
interface IndexCondition {
  pageIndex?: number;
  pageSize?: number;
  select?: string | string[];
  populate?: { path?: string; select?: string };
  customSort?: Record<string, any>;
  find?: Record<string, any>;
}

export default class WorkController extends Controller {
  @validateInput(workCreateRules, 'workValidateFail')
  async createWork() {
    const { ctx, service } = this;
    const workData = await service.work.createEmptyWork(ctx.request.body);
    ctx.helper.success({ ctx, res: workData });
  }
}
