###### casl征对属性的权限管理

```typescript
const { AbilityBuilder, Ability } = require('@casl/ability')
const { permittedFieldsOf } = require('@casl/ability/extra')
import { pick } from 'lodash'

class Work {
  constructor(attrs) {
    // 这里就简单的将属性添加到类返回的实例上
    Object.assign(this, attrs)
  }
}
// 创建用户的interface
interface IUser {
  id: number;
  role: 'admin' | 'vip' | 'normal';
}
// 管理员
const adminUser: IUser = {
  id: 1,
  role: 'admin'
}
// 未付费的普通用户
const normalUser: IUser = {
  id: 2,
  role: 'normal'
}
// VIP客户
const payedUser: IUser = {
  id: 3,
  role: 'vip'
}
const WORK_FIELDS = ['id', 'author', 'isTemplate', 'title', 'content', 'uuid']
const options = { fieldsFrom: rule => rule.fields || WORK_FIELDS }
// 1.创建一个模版的实例
const vipWork = new Work({id: 1, author: 3, isTemplate: true, title: 'test', content: 'ABC', uui:'xyz'})
// 2.创一个作品的实例
const normalWork = new Work({id: 2, author: 2, isTemplate: false, title: 'test', content: 'ABC', uui:'cced'})

// 定义权限规则
function defineRules(user: IUser) {
  // 实化AbilityBuilder, 取出can , cannot ,build
  const { can, cannot, build } = new AbilityBuilder(Ability)
  if (user.role === 'admin') {
    // admin 可以操作何资源
    can('manage', 'all')
  } else if (user.role === 'vip') {
    // vip 的特权
    can('download', 'Work')
    can('read', 'Work');
    can('delete', 'Work', { author: user.id })
    // 可更新指定属性指定[ 'title', 'content', 'uuid' ]
    can('update', 'Work', [ 'title', 'content', 'uuid' ], { author: user.id })
  } 
  if (user.role === 'normal') {
    can('read', 'Work');
    can('delete', 'Work', { author: user.id })
    // 可更新指定属性指定[ 'title', 'content' ]
    can('update', 'Work', [ 'title', 'content' ], { author: user.id })
  }
  return build();
}
// 验证这些权限
const rules = defineRules(adminUser)
// admin roles
console.log('admin', rules.can('read', 'Work'))
console.log('admin', rules.can('delete', 'Work'))
console.log(rules.can('update', vipWork))
console.log(rules.can('update', normalWork))
// vip role
const rules2 = defineRules(payedUser)
console.log('vip', rules2.can('download', 'Work'))
console.log('vip update title', rules2.can('update', vipWork, 'title'))
console.log('vip update content', rules2.can('update', vipWork, 'content'))
console.log('vip update uuid', rules2.can('update', vipWork, 'uuid'))
// console.log('vip', rules2.can('update', normalWork))
// normal role
const rules3 = defineRules(normalUser)
console.log('normal', rules3.can('download', 'Work'))
console.log('normal update title', rules3.can('update', normalWork, 'title'))
console.log('normal update content', rules3.can('update', normalWork, 'content'))
console.log('normal update uuid', rules3.can('update', normalWork, 'uuid'))

// check allowed fields (检查可以使用的字段)
const fields = permittedFieldsOf(rules2, 'update', vipWork, options)
console.log('vip allowed update', fields)
const fields2 = permittedFieldsOf(rules3, 'update', normalWork, options)
console.log('normal allowed update', fields2)

// normal User request
const reqBody = {
  title: 'CASL',
  content: 'powerful',
  uuid: 'hbzeng', // 只有 vip 才能修改这个字段
}

const rawWork = pick(reqBody, fields2)
console.log('normal user after filter', rawWork);
```

##### 展法属性测试的结果：

![1668393475744](image/7-6CASL学习第三部分-管理属性权限/1668393475744.png)
