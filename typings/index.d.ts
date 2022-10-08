import 'egg';
import mongoose, { Connection, Model } from 'mongoose';

declare module 'egg' {
  type MongooseModel = {
    [key: string]: Model<any>;
  };
  interface Application {
    mongoose: Connection;
    model: MongooseModel;
  }
}
