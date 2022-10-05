## Egg.js的基础知识

#### Controller获取http请求参数

```
POST /api/posts?name=viking HTTP/1.1
Host: localhost:3000
Content-Type: application/json; charset=UTF-8

{"title":"controller","content":"what is controller"}
```

* Method
* Path(包含query)
* Headers(可能会Cookie等)
* body

Koa Request 文档地址：https://koajs.com/#request

Koa Request Aliases: https://koajs.com/#request-aliases


**框架对于body的特殊处理规则**

* 当请求的Content-Type为application/json,application/json-patch+json
  application/vnd.api+json和application/csp-report时，会按照json格式
  对请求body进行解析，并限制body最大长度为100kb.
* 当请求Content-type为application/x-www-form-urlencoded时，会按照
  form格式对请求body进行解析，并限制body最大长度为100kb.


# 要求

Koa `Request`对象是 node 的 vanilla request 对象之上的抽象，提供了对日常 HTTP 服务器开发有用的附加功能。

## API

### 请求头

请求头对象。[`headers`](https://nodejs.org/api/http.html#http_message_headers)这与节点上的字段相同[`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage)。

### 请求头=

设置请求头对象。

### request.headers

请求头对象。别名为 `request.header`.

### 请求头=

设置请求头对象。别名为 `request.header=`.

### 请求方法

请求方法。

### 请求.方法=

设置请求方法，用于实现中间件，如 `methodOverride()`.

### 请求长度

将请求 Content-Length 作为数字返回（如果存在），或 `undefined`.

### 请求.url

获取请求 URL。

### 请求.url=

设置请求 URL，对 url 重写很有用。

### request.originalUrl

获取请求原始 URL。

### 请求来源

获取 URL 的来源，包括 `protocol`和 `host`.

```
ctx.request.origin
// => http://example.com
```

### 请求.href

获取完整的请求 URL，`protocol`包括 `host`和 `url`。

```
ctx.request.href;
// => http://example.com/foo/bar?q=1
```

### 请求路径

获取请求路径名。

### 请求路径=

设置请求路径名并在存在时保留查询字符串。

### request.querystring

获取 void 的原始查询字符串 `?`。

### request.querystring=

设置原始查询字符串。

### 请求搜索

使用 .获取原始查询字符串 `?`。

### 请求.搜索=

设置原始查询字符串。

### 请求主机

在存在时获取主机（主机名：端口）。支持 `X-Forwarded-Host` when `app.proxy`为 **true** ，否则 `Host`使用。

### 请求.主机名

存在时获取主机名。支持 `X-Forwarded-Host` when `app.proxy`为 **true** ，否则 `Host`使用。

如果主机是 IPv6，Koa 将解析委托给 [WHATWG URL API](https://nodejs.org/dist/latest-v8.x/docs/api/url.html#url_the_whatwg_url_api)， *注意*这可能会影响性能。

### 请求.URL

获取 WHATWG 解析的 URL 对象。

### 请求类型

`Content-Type`获取没有“charset”等参数的 请求。

```
const ct = ctx.request.type;
// => "image/png"
```

### 请求字符集

在存在时获取请求字符集，或者 `undefined`：

```
ctx.request.charset;
// => "utf-8"
```

### 请求查询

获取解析的查询字符串，当不存在查询字符串时返回一个空对象。请注意，此 getter 不*支持* 嵌套解析。

例如“颜色=蓝色&尺寸=小”：

```
{
  color: 'blue',
  size: 'small'
}
```

### 请求.查询=

将查询字符串设置为给定对象。请注意，此设置器*不*支持嵌套对象。

```
ctx.query = { next: '/login' };
```

### 请求.新鲜

检查请求缓存是否“新鲜”，也就是内容没有改变。此方法用于 `If-None-Match`/`ETag`和 `If-Modified-Since`和之间的缓存协商 `Last-Modified`。应在设置一个或多个这些响应标头后引用它。

```
// freshness check requires status 20x or 304
ctx.status = 200;
ctx.set('ETag', '123');

// cache is ok
if (ctx.fresh) {
  ctx.status = 304;
  return;
}

// cache is stale
// fetch new data
ctx.body = await db.find('something');
```

### 请求.stale

的倒数 `request.fresh`。

### 请求协议

返回请求协议，“https”或“http”。支持 `X-Forwarded-Proto` when `app.proxy`为 **true** 。

### 请求安全

`ctx.protocol == "https"`检查是否通过 TLS 发出请求的 简写。

### 请求.ip

请求远程地址。支持 `X-Forwarded-For`when `app.proxy` 为 **true** 。

### 请求.ips

当 `X-Forwarded-For`存在并 `app.proxy`启用时，将返回这些 ips 的数组，从上游 -> 下游排序。禁用时返回一个空数组。

例如，如果值为“client, proxy1, proxy2”，您将收到数组 `["client", "proxy1", "proxy2"]`。

大部分反向代理（nginx）都设置了x-forwarded-for via `proxy_add_x_forwarded_for`，存在一定的安全隐患。恶意攻击者可以通过伪造 `X-Forwarded-For`请求头来伪造客户端的 IP 地址。客户端发送的请求具有 `X-Forwarded-For`“伪造”的请求标头。被反向代理转发后，`request.ips`会是['forged', 'client', 'proxy1', 'proxy2']。

Koa 提供了两个选项来避免被绕过。

如果可以控制反向代理，可以通过调整配置避免绕过，或者使用 `app.proxyIpHeader` koa提供的避免读取 `x-forwarded-for`获取ips。

```
  const app = new Koa({
    proxy: true,
    proxyIpHeader: 'X-Real-IP',
  });
```

如果您确切知道服务器前面有多少反向代理，则可以通过配置避免读取用户的伪造请求标头 `app.maxIpsCount`：

```
  const app = new Koa({
    proxy: true,
    maxIpsCount: 1, // only one proxy in front of the server
  });

  // request.header['X-Forwarded-For'] === [ '127.0.0.1', '127.0.0.2' ];
  // ctx.ips === [ '127.0.0.2' ];
```

### 请求子域

将子域作为数组返回。

子域是应用程序主域之前主机的点分隔部分。默认情况下，应用程序的域被假定为主机的最后两部分。这可以通过设置来改变 `app.subdomainOffset`。

例如，如果域是“tobi.ferrets.example.com”： 如果 `app.subdomainOffset`未设置，`ctx.subdomains`则为 `["ferrets", "tobi"]`. 如果 `app.subdomainOffset`是 3，`ctx.subdomains`是 `["tobi"]`。

### request.is（类型...）

检查传入请求是否包含“Content-Type”标头字段，并且是否包含任何给定的 mime `type`。如果没有请求正文，`null`则返回。如果没有内容类型，或者匹配失败 `false`则返回。否则，它返回匹配的内容类型。

```
// With Content-Type: text/html; charset=utf-8
ctx.is('html'); // => 'html'
ctx.is('text/html'); // => 'text/html'
ctx.is('text/*', 'text/html'); // => 'text/html'

// When Content-Type is application/json
ctx.is('json', 'urlencoded'); // => 'json'
ctx.is('application/json'); // => 'application/json'
ctx.is('html', 'application/*'); // => 'application/json'

ctx.is('html'); // => false
```

例如，如果您想确保仅将图像发送到给定路由：

```
if (ctx.is('image/*')) {
  // process
} else {
  ctx.throw(415, 'images only!');
}
```

### 内容协商

Koa 的 `request`对象包括由[accept](http://github.com/expressjs/accepts)和[negotiator](https://github.com/federomero/negotiator)提供支持的有用的内容协商实用程序。这些实用程序是：

* `request.accepts(types)`
* `request.acceptsEncodings(types)`
* `request.acceptsCharsets(charsets)`
* `request.acceptsLanguages(langs)`

如果未提供任何类型，则返回**所有**可接受的类型。

如果提供了多种类型，则将返回最佳匹配。如果未找到匹配项，`false`则返回 a，您应该向客户端发送 `406 "Not Acceptable"`响应。

如果缺少可接受的任何类型的接受标头，则将返回第一个类型。因此，您提供的类型的顺序很重要。

### request.accepts（类型）

检查给定 `type(s)`是否可以接受，如果为真则返回最佳匹配，否则返回 `false`。该 `type`值可以是一个或多个 mime 类型的字符串，例如“application/json”，扩展名，例如“json”，或者一个数组 `["json", "html", "text/plain"]`。

```
// Accept: text/html
ctx.accepts('html');
// => "html"

// Accept: text/*, application/json
ctx.accepts('html');
// => "html"
ctx.accepts('text/html');
// => "text/html"
ctx.accepts('json', 'text');
// => "json"
ctx.accepts('application/json');
// => "application/json"

// Accept: text/*, application/json
ctx.accepts('image/png');
ctx.accepts('png');
// => false

// Accept: text/*;q=.5, application/json
ctx.accepts(['html', 'json']);
ctx.accepts('html', 'json');
// => "json"

// No Accept header
ctx.accepts('html', 'json');
// => "html"
ctx.accepts('json', 'html');
// => "json"
```

您可以随意调用 `ctx.accepts()`多次，或使用开关：

```
switch (ctx.accepts('json', 'html', 'text')) {
  case 'json': break;
  case 'html': break;
  case 'text': break;
  default: ctx.throw(406, 'json, html, or text only');
}
```

### request.acceptsEncodings(编码)

检查是否 `encodings`可以接受，为真时返回最佳匹配，否则返回 `false`。请注意，您应该包含 `identity`其中一种编码！

```
// Accept-Encoding: gzip
ctx.acceptsEncodings('gzip', 'deflate', 'identity');
// => "gzip"

ctx.acceptsEncodings(['gzip', 'deflate', 'identity']);
// => "gzip"
```

当没有给出参数时，所有接受的编码都作为数组返回：

```
// Accept-Encoding: gzip, deflate
ctx.acceptsEncodings();
// => ["gzip", "deflate", "identity"]
```

请注意，`identity`如果客户端显式发送 `identity;q=0`. 尽管这是一种边缘情况，但您仍应处理此方法返回的情况 `false`。

### request.acceptsCharsets(字符集)

检查是否 `charsets`可以接受，为真时返回最佳匹配，否则返回 `false`。

```
// Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5
ctx.acceptsCharsets('utf-8', 'utf-7');
// => "utf-8"

ctx.acceptsCharsets(['utf-7', 'utf-8']);
// => "utf-8"
```

当没有给出参数时，所有接受的字符集都作为数组返回：

```
// Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5
ctx.acceptsCharsets();
// => ["utf-8", "utf-7", "iso-8859-1"]
```

### request.acceptsLanguages(语言)

检查是否 `langs`可以接受，为真时返回最佳匹配，否则返回 `false`。

```
// Accept-Language: en;q=0.8, es, pt
ctx.acceptsLanguages('es', 'en');
// => "es"

ctx.acceptsLanguages(['en', 'es']);
// => "es"
```

当没有给出参数时，所有接受的语言都作为数组返回：

```
// Accept-Language: en;q=0.8, es, pt
ctx.acceptsLanguages();
// => ["es", "pt", "en"]
```

### 请求.幂等

检查请求是否是幂等的。

### 请求.socket

返回请求套接字。

### 请求.get（字段）

返回不区分大小写的请求标头 `field`。

# 回复

Koa `Response`对象是 node 的 vanilla 响应对象之上的抽象，提供了对日常 HTTP 服务器开发有用的附加功能。

## API

### 响应头

响应头对象。

### response.headers

响应头对象。别名为 `response.header`.

### response.socket

响应套接字。指向 net.Socket 实例为 `request.socket`.

### 响应状态

获取响应状态。默认情况下，`response.status`设置为 `404`与 `res.statusCode`默认为 `200`.

### 响应状态=

通过数字代码设置响应状态：

* 100“继续”
* 101“交换协议”
* 102“处理”
* 200“好”
* 201“创建”
* 202“接受”
* 203“非权威信息”
* 204“无内容”
* 205“重置内容”
* 206“部分内容”
* 207“多状态”
* 208“已报告”
* 第226章
* 300“多项选择”
* 301“永久移动”
* 302“找到”
* 303“见其他”
* 304“未修改”
* 305“使用代理”
* 307“临时重定向”
* 308“永久重定向”
* 400“错误请求”
* 401“未经授权”
* 402“需要付款”
* 403“禁止”
* 404“未找到”
* 405“方法不允许”
* 406“不可接受”
* 407“需要代理身份验证”
* 408“请求超时”
* 409“冲突”
* 410“走了”
* 411“所需长度”
* 412“先决条件失败”
* 413“负载过大”
* 414“uri 太长”
* 415“不支持的媒体类型”
* 416“范围不可满足”
* 417“预期失败”
* 418“我是茶壶”
* 422“无法处理的实体”
* 423“锁定”
* 424“依赖失败”
* 426“需要升级”
* 428“需要先决条件”
* 429“请求过多”
* 431“请求头字段太大”
* 500内部服务器错误”
* 501“未实施”
* 502错误的网关”
* 503服务不可用”
* 504网关超时”
* 505“不支持http版本”
* 506“变种也协商”
* 507“存储空间不足”
* 508“检测到循环”
* 510“未扩展”
* 511“需要网络认证”

 **注意** ：不要太担心记住这些字符串，如果你有错字，会抛出一个错误，显示这个列表以便你进行更正。

由于 `response.status`默认设置为 `404`，因此要发送没有正文且具有不同状态的响应，请按如下方式完成：

```
ctx.response.status = 200;

// Or whatever other status
ctx.response.status = 204;
```

### 响应消息

获取响应状态消息。默认情况下，`response.message`与 关联 `response.status`。

### response.message=

将响应状态消息设置为给定值。

### 响应长度=

将响应内容长度设置为给定值。

### 响应长度

返回响应 Content-Length 作为一个数字（如果存在），或从 `ctx.body`可能的情况下推断，或 `undefined`.

### 响应体

获取响应正文。

### 响应体=

将响应正文设置为以下之一：

* `string`书面
* `Buffer`书面
* `Stream`管道
* `Object`|| `Array`json字符串化
* `null`|| `undefined`没有内容响应

如果 `response.status`没有设置，Koa 会自动将状态设置为 `200`或 `204`取决于 `response.body`。具体来说，如果 `response.body`没有设置或者已经设置为 `null`or `undefined`，Koa 会自动设置 `response.status`为 `204`。如果你真的不想发送其他状态的内容响应，你应该通过 `204`以下方式覆盖状态：

```
// This must be always set first before status, since null | undefined
// body automatically sets the status to 204
ctx.body = null;
// Now we override the 204 status with the desired one
ctx.status = 200;
```

Koa 并没有防范所有可以作为响应体的东西——一个函数没有有意义的序列化，根据您的应用程序返回一个布尔值可能是有意义的，虽然错误有效，但它可能无法像某些预期的那样工作错误的属性不可枚举。我们建议在您的应用程序中添加中间件，以断言每个应用程序的正文类型。一个示例中间件可能是：

```
app.use(async (ctx, next) => {
  await next()

  ctx.assert.equal('object', typeof ctx.body, 500, 'some dev did something wrong')
})
```

#### 细绳

Content-Type 默认为 text/html 或 text/plain，两者都具有 utf-8 的默认字符集。Content-Length 字段也被设置。

#### 缓冲

Content-Type 默认为 application/octet-stream，并且 Content-Length 也被设置。

#### 溪流

Content-Type 默认为 application/octet-stream。

每当将流设置为响应主体时，`.onerror`都会自动将其添加为 `error`事件的侦听器以捕获任何错误。此外，只要请求关闭（甚至是过早关闭），流就会被销毁。如果您不想要这两个功能，请不要直接将流设置为主体。例如，在代理中将主体设置为 HTTP 流时，您可能不希望这样做，因为它会破坏底层连接。

有关更多信息， 请参阅：[https ://github.com/koajs/koa/pull/612。](https://github.com/koajs/koa/pull/612)

这是一个不自动销毁流的流错误处理示例：

```
const PassThrough = require('stream').PassThrough;

app.use(async ctx => {
  ctx.body = someHTTPStream.on('error', (err) => ctx.onerror(err)).pipe(PassThrough());
});
```

#### 目的

Content-Type 默认为 application/json。这包括普通对象 `{ foo: 'bar' }`和数组 `['foo', 'bar']`。

### response.get(字段)

获取不区分大小写的响应头字段值 `field`。

```
const etag = ctx.response.get('ETag');
```

### response.has(字段)

`true`如果由名称标识的标头当前设置在传出标头中，则 返回。标头名称匹配不区分大小写。

```
const rateLimited = ctx.response.has('X-RateLimit-Limit');
```

### response.set（字段，值）

将响应标头设置 `field`为 `value`：

```
ctx.set('Cache-Control', 'no-cache');
```

### response.append（字段，值）

附加 `field`带有 value的附加标头 `val`。

```
ctx.append('Link', '<http://127.0.0.1/>');
```

### response.set（字段）

`fields`用一个对象 设置几个响应头：

```
ctx.set({
  'Etag': '1234',
  'Last-Modified': date
});
```

这委托给[setHeader](https://nodejs.org/dist/latest/docs/api/http.html#http_request_setheader_name_value)通过指定的键设置或更新标头，并且不会重置整个标头。

### response.remove(字段)

删除标题 `field`。

### 响应类型

`Content-Type`获取没有“字符集”等参数的 响应。

```
const ct = ctx.type;
// => "image/png"
```

### 响应类型=

`Content-Type`通过 mime 字符串或文件扩展名 设置响应。

```
ctx.type = 'text/plain; charset=utf-8';
ctx.type = 'image/png';
ctx.type = '.png';
ctx.type = 'png';
```

注意：当 `charset`为您选择适当的 a 时，例如 `response.type = 'html'`将默认为“utf-8”。如果需要覆盖 `charset`，请使用 `ctx.set('Content-Type', 'text/html')`直接将响应头字段设置为值。

### response.is(类型...)

非常相似 `ctx.request.is()`。检查响应类型是否是提供的类型之一。这对于创建操纵响应的中间件特别有用。

例如，这是一个中间件，可以缩小除流之外的所有 HTML 响应。

```
const minify = require('html-minifier');

app.use(async (ctx, next) => {
  await next();

  if (!ctx.response.is('html')) return;

  let body = ctx.body;
  if (!body || body.pipe) return;

  if (Buffer.isBuffer(body)) body = body.toString();
  ctx.body = minify(body);
});
```

### response.redirect（网址，[alt]）

执行 [302] 重定向到 `url`.

`alt`当 Referrer 不存在或使用“/” 时，字符串“back”是特殊情况下提供 Referrer 支持。

```
ctx.redirect('back');
ctx.redirect('back', '/index.html');
ctx.redirect('/login');
ctx.redirect('http://google.com');
```

要更改 的默认状态 `302`，只需在此调用之前或之后分配状态即可。要更改主体，请在此调用之后分配它：

```
ctx.status = 301;
ctx.redirect('/cart');
ctx.body = 'Redirecting to shopping cart';
```

### response.attachment（[文件名]，[选项]）

设置 `Content-Disposition`为“附件”以向客户端发出提示下载的信号。可选地指定 `filename`下载和一些[选项](https://github.com/jshttp/content-disposition#options)。

### response.headerSent

检查是否已发送响应标头。对于查看客户端是否会收到错误通知很有用。

### response.lastModified

如果存在，则将 `Last-Modified`标头 返回为 a 。`Date`

### response.lastModified=

将 `Last-Modified`标头设置为适当的 UTC 字符串。您可以将其设置为 `Date`日期字符串或日期字符串。

```
ctx.response.lastModified = new Date();
```

### 响应.etag=

设置响应的 ETag，包括包装 `"`的 s。请注意，没有相应的 `response.etag`getter。

```
ctx.response.etag = crypto.createHash('md5').update(ctx.body).digest('hex');
```

### 响应。变化（字段）

改变 `field`。

### response.flushHeaders()

刷新任何设置的标题，然后开始正文。

# 赞助

[Apex Ping](https://apex.sh/ping)是一个漂亮的网站和 API 正常运行时间监控解决方案，由 Koa 的原作者之一开发。

[![](https://apex-inc.imgix.net/images/products/apex-ping/marketing/overview.png?auto=format&w=1400)](https://apex.sh/ping)

# 链接

用于发现 Koa 的第三方中间件的社区链接、完整的可运行示例、详尽的指南等等！如果您有任何问题，请加入我们的 IRC！

* [GitHub存储库](https://github.com/koajs/koa)
* [例子](https://github.com/koajs/examples)
* [中间件](https://github.com/koajs/koa/wiki)
* [维基](https://github.com/koajs/koa/wiki)
* [邮件列表](https://groups.google.com/forum/#!forum/koajs)
* [指导](https://github.com/koajs/koa/blob/master/docs/guide.md)
* [常问问题](https://github.com/koajs/koa/blob/master/docs/faq.md)
* **#koajs**在 freenode 上
