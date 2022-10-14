```javascript
// 在某个逻辑代码读取 session 的逻辑，比如 ctx.session.username
// = this[CONTEXT_SESSION].get().username
// context.js Line 30 return this.session
// context.js L107 initFromcookie
// context.js L206 create() this.session = new Session(this,val)
// this.session = { username: 'kevin', _sessCtx: "...", _ctx: "..."}
// this.session.username === 'kevin'

    session: {
      get() {
        return this[CONTEXT_SESSION].get();
      },

```