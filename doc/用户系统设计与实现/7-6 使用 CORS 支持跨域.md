#### 使用CORS支持跨域资源共享

**浏览器限制脚本内发送跨域http请求**

* XMLHttpRequest或Fetch
* drawImage将mages/vide绘制cancas

**何为跨域origin?**

* 协议
* 主机（域名）
* 端口

```javascript
// 不同的协议
http://example.com/app1
https://example.com/app2

// 不同主机
http://example.com
http://www.exapmle.com

// 不同的端口号
http://expample.com
http://expample.com:8080
```

**CORS(Cross-Origin Resource Sharing, 跨域资源共享)字段**

跨源资源共享标准新增了一组HTTP首部字段，允许服务器声明那些源站通过浏览器

有权限访问那些资源。

* Access-Control-Allow-Origin: `<origin> | *`
  // 只能拿到一些最基本的响应头，
  Cache-Control 、Content-Language、Content-Type、Expires、Last-Modifed、Pragma
  Access-Control-Expose-Headers: X-My-Custom-Header,
  X-Another-Customer-Header
  Access-Control-Allow-Methods: `<method>[,<method>]* `

**Prflight**

对那些可能对服务器数据产生副作用的HTTP请求方法（特别是

GET 以外的HTTP请求，或者搭配某些MIME类型POST请求），

浏览器必须首先使用OPTIONS方法发一个预检请求（preflight request）

从而获知服务端是允放该跨源请示。

**简单请求不会送Preflight请求**

* 使用下例方法之一
  * GET
  * HEAD
  * POST
* Content-Type的值仅限于下例三者之一
  * text/plain
  * multipart/form-data
  * application/x-www-form-urlencoded
* 没有自定义的Header
