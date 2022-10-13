**1.用以下方式可以将不需要的字段删掉**：
特别注意：需要将转换的结果断言成any, 因为password 是 required: true

```javascript
    const userObj = user.toJSON() as any;
    delete userObj.password;
```

**2.直接在model中进行处理将不需要字段删除**：
```javascript
  function initUserModel(app: Application) {
  const UserSchema = new Schema<UserProps>(
    {
      username: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      nickName: { type: String },
      picture: { type: String },
      email: { type: String },
      phoneNumber: { type: String },
    },
    {
      timestamps: true,
      toJSON: {
        transform(_doc, ret) {
          delete ret.password;
          delete ret.__v;
        },
      },
    },
  );
  return app.mongoose.model<UserProps>('User', UserSchema);
}

```
**3.在controller中调toJSON方法自动进行转换处理**
```javascript
    // const userObj = user.toJSON() as any;
    // delete userObj.password;
    ctx.helper.success({ ctx, res: user.toJSON(), msg: '登录成功' });
```