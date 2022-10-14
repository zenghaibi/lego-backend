### Session

Cookie在web应用中经常承担标识请求身份的功能，所以web应用在cookie的基础上

封装了session概念。专门用来做用户身份识别。

框架内置了Session插件，给我们提供了ctx.session来访问或者修改当前用户Session

```javascript
class HomeController extends Controller {
  async fetchPosts() {
    const cxt = this.ctx;
    // 获取session 上传的内容
    const userId = ctx.session.userId;
    const posts = await ctx.service.post.fetch(userId);
    // 修改Session的值
    ctx.session.visited = ctx.session.visited? (ctx.session.visited + 1):
    ctx.body = {
      success: true,
      posts,
    };
  }
}
```
Session的实现是基于Cookie的，默认配置下，用户Session的内置加密后直接存储在Cookie中的一个字段中
用户每次请求我们网站的时候都会带上这个cookie，我们在服务端解密后使用。Session的默认配置如下：

```javascript
  exports.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1天
    httpOnly: true,
    encrypt: true,
  }
```
可能看到这些参数除了key都是cookie的参数，key代表了存储session的Cookie键值对的key是什
么，在默认的配置下，存放Sesion的Cookie将会加密存储，不可被前端js访问。这样可以保证用户的
Session是安全的。


#### 目前 Session 会话实现方式的优缺点

**egg-session 默认的实现方式**

**优点：**

* 客户端序列化，服务器不需要保存任何数据，类似之后我们要讲解的 token-based 认证（jwt）
* 适合小型应用，低成本解决持久化和横向扩展的问题

**缺点：**

* 浏览器有对于 Cookie 大小的限制(4093 bytes)，不能存入太多的信息
* Cookie 在每次请求时都会带上，当 Session 过大时，每次请求都要额外带上庞大的 Cookie 信息。
* 扩展知识：静态资源采用 CDN 的方式，除了多服务器提高响应速度之外，另外有一个优点也是可以避免带着 Cookie
* 比如 [zhihu.com](http://zhihu.com/) 图片存储都在 [pic1.zhimg.com](http://pic1.zhimg.com/)

**session 经典实现方式，egg-session 使用外部存储，内存或者缓存（redis）或者数据库**

**优点：**

* 原理简单易懂，实现简单
* 可以对已登录用户进行快速操作 - 封禁，踢出登录等等

**缺点：**

* 有硬件成本，占用服务器内存
* 强依赖，服务挂了的话，会话功能完全无法使用。
* 多进程或者多服务器时，同步是个问题 - 采用第三方统一服务，又有额外的成本

![图片描述](https://img.mukewang.com/wiki/61b945fd096952d721261080.jpg)
