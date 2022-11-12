import { Controller } from 'egg';
import { PopulateOptions } from 'mongoose';
import validateInput from '../decorator/inputValidate';
import checkPerimssion from '../decorator/checkPermission';
import { nanoid } from 'nanoid';
const workCreateRules = {
  title: 'string',
};
const channelCreateRules = {
  name: 'string',
  workId: 'number',
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
  // 创建渠道
  @validateInput(channelCreateRules, 'channelValidateFail')
  async createChannel() {
    const { ctx } = this;
    const { name, workId } = ctx.request.body;
    const newChannel = {
      name,
      id: nanoid(6),
    };
    await ctx.model.Work.findOneAndUpdate(
      { id: workId },
      { $push: { channels: newChannel } }
    );
    ctx.helper.success({ ctx, res: newChannel });
  }
  // 获取渠道
  async getWorkChannel() {
    const { ctx } = this;
    const { id } = ctx.params;
    const certianWork = await ctx.model.Work.findOne({ id });
    if (certianWork) {
      const { channels } = certianWork;
      ctx.helper.success({
        ctx,
        res: {
          count: (channels && channels.length) || 0,
          list: channels || [],
        },
      });
    } else {
      ctx.helper.error({ ctx, errorType: 'channelOperateFail' });
    }
  }
  @validateInput(workCreateRules, 'workValidateFail')
  async createWork() {
    const { ctx, service } = this;
    const workData = await service.work.createEmptyWork(ctx.request.body);
    ctx.helper.success({ ctx, res: workData });
  }
  // 查询我作品列表
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
    const res = await this.service.work.getList(listCondition);
    console.log(res);
    ctx.helper.success({ ctx, res });
  }
  // 查询模版
  async templateList() {
    const { ctx } = this;
    const { pageIndex, pageSize } = ctx.query;
    const listCondition: IndexCondition = {
      select: 'id author copiedCount coverImag desc title user isHot createAt',
      populate: { path: 'user', select: 'username nickName picture' },
      find: { isPublic: true, isTemplate: true },
      ...(pageIndex && { pageIndex: parseInt(pageIndex) }),
      ...(pageSize && { pageSize: parseInt(pageSize) }),
    };

    const res = await ctx.service.work.getList(listCondition);
    ctx.helper.success({ ctx, res });
  }
  // 更新作品
  @checkPerimssion('Work', 'workNoPermissonFail')
  async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body;
    const res = await ctx.model.Work.findOneAndUpdate({ id }, payload, {
      new: true,
    }).lean();
    ctx.helper.success({ ctx, res });
  }
  // 删除作品
  @checkPerimssion('Work', 'workNoPermissonFail')
  async delete() {
    const { ctx } = this;
    const { id } = ctx.params;
    const res = await ctx.model.Work.findOneAndDelete({ id })
      .select('_id id title')
      .lean();
    ctx.helper.success({ ctx, res });
  }
  // 发布
  @checkPerimssion('Work', 'workNoPermissonFail')
  async publish(isTemplate: boolean) {
    const { ctx } = this;
    const url = await ctx.service.work.publish(ctx.params.id, isTemplate);
    ctx.helper.success({ ctx, res: { url } });
  }
  // 发布作品
  async publishWork() {
    console.log('1111');
    await this.publish(false);
  }
  // 发布模版
  async publishTemplate() {
    await this.publish(true);
  }
}
