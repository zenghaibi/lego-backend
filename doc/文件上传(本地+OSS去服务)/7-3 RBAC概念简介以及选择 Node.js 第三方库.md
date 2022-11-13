##### 7-3 RBAC概念简介以及选择 Node.js 第三方库

* 权限验证的场景以及需求：
  * 特定的角色的用户才能操作特定的资源
  * 不同的用户能操作同类资源的特定实体
  * 不同的用户操作特定资源的不同属 性。
* 谁(User)拥有什么权限（Authority）去操作（Operation）那些资源（Resource）
* 根据角色完成权限的控制- RBAC(role based access control)

![图片描述](https://img.mukewang.com/wiki/61cad9b8099b4d9506010402.jpg)

**Node.js 实现RBAC的库**

* AccessControl.js  https://github.com/onury/accesscontrol
  * 1.6 Star
  * 3年没有更新，很多issue没人处理
  * 不支持ts
* Casbin https://github.com/casbin/node-casbin
  * 1.7k Star
  * ts 编写，支持多种编程语言
  * 概念比交复杂，使用略繁琐
* CAS https://github.com/stalnily/casl
  * 3.4 Star
  * ts 编写
  *
