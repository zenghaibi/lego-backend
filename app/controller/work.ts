import { Controller } from 'egg';
import { PopulateOptions } from 'mongoose';
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
export interface IndexCondition {
  pageIndex?: number;
  pageSize?: number;
  select?: string | string[];
  populate?: PopulateOptions | (PopulateOptions | string)[];
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
  async myList() {
    const { ctx } = this;
    const userId = ctx.state.user._id;
    const { pageIndex, pageSize, isTemplate, title } = ctx.query;
    const findConditon = {
      user: userId,
      ...(title && { title: { $regex: title, $options: 'i' } }),
      ...(isTemplate && { isTemplate: !!parseInt(isTemplate) }),
    };
    const listCondition: IndexCondition = {
      select: 'id author copiedCount coverImag desc title user isHot createAt',
      populate: { path: 'user', select: 'username nickName picture' },
      find: findConditon,
      ...(pageIndex && { pageIndex: parseInt(pageIndex) }),
      ...(pageSize && { pageSize: parseInt(pageSize) }),
    };
    console.log('查询条件', listCondition);
    const res = await this.service.work.getList(listCondition);
    console.log(res);
    ctx.helper.success({ ctx, res });
  }
}
