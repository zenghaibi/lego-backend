import { Application } from 'egg';
import { ObjectId } from 'mongoose';
import { Schema } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
// import { UserProps } from './user';

export interface WorkProps {
  id?: number;
  uuid: string;
  title: string;
  desc: string;
  coverImg?: string;
  content?: { [key: string]: any };
  isTemplate?: boolean;
  isPublish?: boolean;
  isHot?: boolean;
  author: string;
  copiedCount: number;
  status?: 0 | 1 | 2;
  user: ObjectId;
}

module.exports = (app: Application) => {
  const AutoIncrement = AutoIncrementFactory(app.mongoose);
  const WorkSchema = new Schema<WorkProps>(
    {
      uuid: { type: String, unique: true },
      title: { type: String },
      desc: { type: String },
      coverImg: { type: String },
      content: { type: Object },
      isTemplate: { type: Boolean },
      isPublic: { type: Boolean },
      isHot: { type: Boolean },
      author: { type: String },
      copiedCount: { type: Number, default: 0 },
      status: { type: Number, default: 1 },
      user: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true },
  );
  WorkSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'works_id_counter' });
  return app.mongoose.model<WorkProps>('Work', WorkSchema);
};
