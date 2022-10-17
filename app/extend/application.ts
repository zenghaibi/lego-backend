import { Application } from 'egg';
import axios, { AxiosInstance } from 'axios';
import Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $OpenApi from '@alicloud/openapi-client';
const AXIOS = Symbol('Application#axios');
const ALCLIENT = Symbol('Application#ALClient');
export default {
  // 扩展application 一个方法
  echo(msg: string) {
    const that = this as Application;
    return `hello${msg} ${that.config.name}`;
  },
  // 扩展application 一个属性
  get axiosInstance(): AxiosInstance {
    if (!this[AXIOS]) {
      this[AXIOS] = axios.create({
        baseURL: 'https://dog.ceo/',
        timeout: 5000,
      });
    }
    return this[AXIOS];
  },
  get ALClient(): Dysmsapi20170525 {
    const that = this as Application;
    const { accessKeyId, accessKeySecret } = that.config.aliCloudConfig;

    if (!this[ALCLIENT]) {
      const config = new $OpenApi.Config({
        accessKeyId,
        accessKeySecret,
      });
      config.endpoint = 'dysmsapi.aliyuncs.com';
      this[ALCLIENT] = new Dysmsapi20170525(config);
    }
    return this[ALCLIENT];
  },
};
