### Node.js后端框架调研

### Express

官方网址: [https://expressjs.com/]()(https://express.com)

#### 安装

官方网址:[[https://expressjs.com/zh-cn/starter/installing.html]()]

### 三大问题

* 路由Routes
* 请求Request
* 响应Response

#### 优缺点

**优点**

* 快速，简单，易上手

***缺点***

* 路由响应中，很有可能有：从外部请求数据的服务，有验证路由的请求参数，返回特定的格式。
* 所有逻辑不分g青红皂白写在一起，很容易产生冗长的难以维护的代码
* 一些大型必备的模块，如第三方服务初始化，安全，日志都没有明确的标准。
