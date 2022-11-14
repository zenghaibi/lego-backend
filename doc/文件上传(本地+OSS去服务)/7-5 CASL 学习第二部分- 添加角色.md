##### 创建用户角色

```typescript

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

```

##### 修改定义的defineRules(user: IUser)

```typescript
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
  } 
  if (user.role === 'normal' || user.role === 'vip') {
    can('read', 'Work');
    can('delete', 'Work', { author: user.id })
    can('update', 'Work', { author: user.id })
  }
  return build();
}
```

##### 测试权限

```typescript
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
console.log('vip', rules2.can('update', vipWork))
console.log('vip', rules2.can('update', normalWork))
// normal role
const rules3 = defineRules(normalUser)
console.log('normal', rules3.can('download', 'Work'))
console.log('normal', rules3.can('update', vipWork))
console.log('normal', rules3.can('update', normalWork))
```

#### 打印测试结果:

![1668384520642](image/7-5CASL学习第二部分-添加角色/1668384520642.png)
