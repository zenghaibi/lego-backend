import { Service } from 'egg';
import { createSSRApp } from 'vue';
import LegoComponents from 'lego-components';
import { renderToString } from '@vue/server-renderer';
export default class UtilsService extends Service {
  async renderToPageData(query: { id: number; uuid: string }) {
    const work = await this.ctx.model.Work.findOne(query).lean();
    if (!work) {
      throw new Error('work not exsit');
    }
    const { title, desc, content } = work;
    const vueApp = createSSRApp({
      data: () => {
        return {
          components: (content && content.components) || [],
        };
      },
      template: '<final-page :components="components"></final-page>',
    });
    vueApp.use(LegoComponents);
    const html = await renderToString(vueApp);
    return {
      html,
      title,
      desc,
    };
  }
}
