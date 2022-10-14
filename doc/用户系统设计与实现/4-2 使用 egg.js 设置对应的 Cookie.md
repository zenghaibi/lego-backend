### egg的cookies 的设置

```javascript
ctx.cookies.set('username', user.username, { encrypt: true });
```

### egg的cookies 的调用

```javascript
const username = ctx.cookies.get('username', { encrypt: true });
```
