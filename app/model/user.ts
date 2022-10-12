import { Application } from 'egg';
import { Schema } from 'mongoose';

export interface UserProps {
  username: string;
  password: string;
  email?: string;
  nickName?: string;
  picture?: string;
  phoneNumber?: string;
  createAt: Date;
  updateAt: Date;
}

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
    { timestamps: true },
  );
  // return app.mongoose.model<UserProps>('User', UserSchema);
  return app.mongoose.models.User || app.mongoose.model<UserProps>('User', UserSchema);
}

export default initUserModel;
