import 'egg';
import { Connection, Model } from 'mongoose';

declare module 'egg' {
  interface MongooseModels extends IModel {
    [key: string]: Model<any>;
  }

  interface Context {
    genHash(plainText: string): Promise<string>;
    compare(plainText: string, hash: string): Promise<boolean>;
  }

  interface EggAppConfig {
    bcrypt: {
      saltRounds: number;
    };
  }

  // 定义一个内存模型
  interface Application {
    sessionMap: {
      [key: string]: any;
    };
    sessionStore: any;
  }
}
