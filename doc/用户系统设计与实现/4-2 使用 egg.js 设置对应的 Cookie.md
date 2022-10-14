### egg的cookies 的设置

```javascript
ctx.cookies.set('username', user.username, { encrypt: true });
```

### egg的cookies 的调用

```javascript
const username = ctx.cookies.get('username', { encrypt: true });
```

### egg 框加密的key
```javascript
  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1664866044287_6647';
```
