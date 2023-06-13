import { Controller } from 'egg';

export default class MenuController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.helper.success({
      ctx,
      res: [
        {
          id: 1,
          name: '销售管理',
          type: 1,
          url: '/main/marketing',
          icon: 'el-icon-s-goods',
          sort: 1,
          createAt: '2023-05-29T14:11:02.000Z',
          updateAt: '2023-05-29T14:11:02.000Z',
          children: [
            {
              id: 2,
              name: '销售订单明细表',
              type: 2,
              url: '/main/marketing/SalesOrderDetail',
              sort: 2,
              parentId: 1,
              createAt: '2023-05-29T14:11:02.000Z',
              updateAt: '2023-05-29T14:11:02.000Z',
            },
            {
              id: 3,
              name: '销售订单进度跟踪',
              type: 2,
              url: '/main/marketing/SalesOrderSchedule',
              sort: 2,
              parentId: 1,
              createAt: '2023-05-29T14:11:02.000Z',
              updateAt: '2023-05-29T14:11:02.000Z',
            },
            {
              id: 9,
              name: '销售报价单BOM',
              type: 2,
              url: '/main/marketing/QuoteAsm',
              sort: 2,
              parentId: 1,
              createAt: '2023-05-29T14:11:02.000Z',
              updateAt: '2023-05-29T14:11:02.000Z',
            }
          ]
        },
        {
          id: 4,
          name: '系统管理',
          type: 1,
          url: '/main/system',
          icon: 'el-icon-office-building',
          sort: 1,
          createAt: '2023-05-29T14:11:02.000Z',
          updateAt: '2023-05-29T14:11:02.000Z',
          children: [
            {
              id: 5,
              name: '部门管理',
              type: 2,
              url: '/main/system/department',
              sort: 1,
              parentId: 4,
              createAt: '2023-05-29T14:11:02.000Z',
              updateAt: '2023-05-29T14:11:02.000Z',
            },
            {
              id: 6,
              name: '菜单管理',
              type: 2,
              url: '/main/system/memu',
              sort: 2,
              parentId: 4,
              createAt: '2023-05-29T14:11:02.000Z',
              updateAt: '2023-05-29T14:11:02.000Z',
            },
            {
              id: 7,
              name: '角色管理',
              type: 2,
              url: '/main/system/role',
              sort: 3,
              parentId: 4,
              createAt: '2023-05-29T14:11:02.000Z',
              updateAt: '2023-05-29T14:11:02.000Z',
            },
            {
              id: 8,
              name: '用户管理',
              type: 2,
              url: '/main/system/user',
              sort: 4,
              parentId: 4,
              createAt: '2023-05-29T14:11:02.000Z',
              updateAt: '2023-05-29T14:11:02.000Z',
            }
          ]
        }
      ]
    });
  }
}