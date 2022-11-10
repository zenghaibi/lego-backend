### 直接拷贝样式文件到 public 的问题

```bash
cp node_modules/logo-components/dist/lego-components.css app/public
代码块
```

* 当组件库升级，样式有更新的时候，需要重新拷贝，非常繁琐
* 当有更多 js 功能的时候，会出现非常多的限制。

```
#1 拷贝安装的第三方库的 umd 模式到 public
#2 在 page.nj 中引用
<script src="/public/third-part.js">
#3 在 index.js 写不支持 es6 模块系统的代码
const result = ThirdPart.init(...)
代码块
```

**我们希望使用 es6 的模块方式书写对应的代码**

```javascript
// 单入口文件 index.js
import 'lego-components/dist/lego-components.css'
import ThirdParty from 'third-party'
import ...

ThirdPart.init()
代码块
```

**解决方案 - Bundler（Webpack）**
