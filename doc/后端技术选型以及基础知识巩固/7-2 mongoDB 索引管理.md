```

    // 创建一个索引，来提升查询性能{name: 1} 表为name字段创建一个升序索引
    // -1 表示创建一个降序索引
    // const result = await testCollection.createIndex({name: 1})
    // console.log(result)
    // 查看这个集合对象有些什么索引
    // const indexResult = await testCollection.listIndexes().toArray()
    // console.log(indexResult)

    // 作一个查询测试（创建索引后）在100万笔中，查询后一笔记录 需要：0 毫秒 扫描文档数 1 个
    const result = await testCollection.find({name: '测试数据XXX1000000'}).explain()
    console.log(result)
```


## 测试结果：

```
(base) sea@seadeMacBook-Pro learn-mongo % ts-node index.ts
connected { ok: 1 }
name_1
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { name: 1 }, name: 'name_1' }
]
(base) sea@seadeMacBook-Pro learn-mongo % ts-node index.ts
connected { ok: 1 }
{
  explainVersion: '1',
  queryPlanner: {
    namespace: 'hello.test_table1',
    indexFilterSet: false,
    parsedQuery: { name: [Object] },
    queryHash: '64908032',
    planCacheKey: 'A6C0273F',
    maxIndexedOrSolutionsReached: false,
    maxIndexedAndSolutionsReached: false,
    maxScansToExplodeReached: false,
    winningPlan: { stage: 'FETCH', inputStage: [Object] },
    rejectedPlans: []
  },
  executionStats: {
    executionSuccess: true,
    nReturned: 1,
    executionTimeMillis: 6,
    totalKeysExamined: 1,
    totalDocsExamined: 1,
    executionStages: {
      stage: 'FETCH',
      nReturned: 1,
      executionTimeMillisEstimate: 0,
```

## dropIndex('name_1') 删除索引


// 删除索引

// const result = await testCollection.dropIndex('name_1')

// console.log(result)

# 在mongo shell 中的操作

### 索引优缺点

* 缺点 索引会增加写操作的代价
* 优点 查询效率高
