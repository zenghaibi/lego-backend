import { Service } from 'egg';
import { createSSRApp } from 'vue';
import LegoComponents from 'lego-components';
import { renderToString } from '@vue/server-renderer';
export default class UtilsService extends Service {
  propsToStyple(props = {}) {
    const keys = Object.keys(props);
    const styleArr = keys.map(key => {
      const formatKey = key.replace(
        /[A-Z]/g,
        c => `-${c.toLocaleLowerCase()}`,
      );
      // fontSize -> font-size
      const value = props[key];
      return `${formatKey}: ${value}`;
    });
    return styleArr.join(';');
  }
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
    const bodyStyle = this.propsToStyple(content && content.props);
    console.log('测试', bodyStyle);
    return {
      html,
      title,
      desc,
      bodyStyle,
    };
  }
}
