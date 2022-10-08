import { Application } from 'egg';
import { Schema } from 'mongoose';

// 自定义一个函数
function initUserModel(app: Application) {
  const UserSchema = new Schema(
    {
      name: { type: String },
      age: { type: Number },
      hobbies: { type: Array },
      team: { type: Schema.Types.ObjectId, ref: 'Team' },
    },
    { collection: 'user' },
  );
  return app.mongoose.model('User', UserSchema);
}
export default initUserModel;
