### 1.学习使用casl 首先照文档选安装:

```bash
// 注意我安装 npm i @casl/ability@5.1.0-next.15
npm install @casl/ability
```

#### 2.参考CASL的官方文档：

* http://casl.js.org/v5/en/guide/define-rules
  * 我们采用AbbilityBuilder Class
    ```typescript
    import { defineAbility } from '@casl/ability';

    export default defineAbility((can, cannot) => {
      can('read', 'Post');
      can('update', 'Post');
      can('read', 'Comment');
      can('update', 'Comment');
    });
    ```

#### 3. CASL 简单用法示例：

```typescript
const { AbilityBuilder, Ability } = require('@casl/ability')
class Work {
  constructor(attrs) {
    // 这里就简单的将属性添加到类返回的实例上
    Object.assign(this, attrs)
  }
}
// 1.创建一个模版的实例
const templateWork = new Work({id: 1, isTemplate: true})
// 2.创一个作品的实例
const notWork = new Work({id: 2, isTemplate: false})

// 定义权限规则
function defineRules() {
  // 实化AbilityBuilder, 取出can , cannot ,build
  const { can, cannot, build } = new AbilityBuilder(Ability)
  // 能够读取Work实体对象资源
  can('read', 'Work')
  // 不能够删除Work实体
  cannot('delete','Work')
  // 能更新Work 条件 isTemplate: false
  can('update', 'Work', { isTemplate: false})
  return build();
}
console.log(templateWork.constructor.name)
// 验证这些权限
const rules = defineRules()
console.log(rules.can('read', 'Work'))
console.log(rules.can('delete', 'Work'))
console.log(rules.can('update', templateWork))
console.log(rules.can('update', notWork))
```
