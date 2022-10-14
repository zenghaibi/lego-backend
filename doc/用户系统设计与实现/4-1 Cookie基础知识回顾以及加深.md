## 用户认证的方式

#### 回顾 Cookie 的基础知识

Cookie 为了解决 HTTP 无状态的问题。[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)

**创建 Cookie**
服务器使用 Set-Cookie 响应头部向用户代理（一般是浏览器）发送 Cookie信息。

```
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry
代码块
```

现在，对该服务器发起的每一次新请求，浏览器都会将之前保存的Cookie信息通过 Cookie 请求头部再发送给服务器。这是一个自动的过程。

```
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
代码块
```

**Cookie 的生命周期**

```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
代码块
```

特别注意：当Cookie的过期时间被设定时，设定的日期和时间只与客户端相关，而不是服务端。

**Cookie 安全性 **

* Secure: 只应通过被 HTTPS 协议加密过的请求发送给服务端
* [HttpOnly: 无法使用 Javascript 对他进行访问。可以有效缓解 XSS 攻击。]()

```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly

// document.cookie 无法访问到对应的数据
代码块
```

**作用域**

* Domain：Domain 指定了哪些主机可以接受 Cookie，如果不指定，默认为 origin，不包含 **子域名** 。
* Path：Path 标识指定了主机下的哪些路径可以接受 Cookie

```
# 假如不设置，假如我们的网址目前是 test.com，只有完全同源才能访问。
Set-Cookie: id=a3fWa;
那么只有 test.com 可以访问，api.test.com 不可访问。
Set-Cookie: id=a3fWa; Domain=test.com; Path=/
# 如果设置，子域名也包含其中，比如
test.com, api.test.com, xxx.test.com
代码块
```

**[SameSite 新的属性]()**
SameSite Cookie 允许服务器要求某个 cookie 在跨站请求时不会被发送，可以阻止跨站请求伪造攻击（Cross-Site Request Forgery，简称 CSRF），SameSite cookies 是相对较新的一个字段，所有主流浏览器都已经得到支持。

```
// 描述问题
// bank.com
Set-Cookie:id=a3fWa;
// evil.com
<form action="bank.com/transfer" method="POST">
  ...
</form>
// 提交表单后，由于登录银行的 cookie 已经存在，钱被转走
// evil2.com 插入一张图片
<img src="http://bank.com/transfer?account=bob&amount=1000000&for=mallory">
// 访问图片后，由于登录银行的 Cookie 还存在，钱被转走
代码块
```

* None
* Strict
* Lax

```
Set-Cookie: CookieName=CookieValue; SameSite=Strict;
代码块复制
```

* Strict最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。换言之，只有当前网页的 URL 与请求目标一致，才会带上 Cookie。
* Lax规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。

  ![图片描述](https://img.mukewang.com/wiki/61b946b4096ef30f20421134.jpg)
