import { Context } from 'egg';
import { GlobErrorTypes, globalErrorMessages } from '../error/index';

interface RespType {
  ctx: Context;
  res?: any;
  msg?: string;
}
interface ErrorRespType {
  ctx: Context;
  errorType: GlobErrorTypes;
  error?: any;
}
export default {
  success({ ctx, res, msg }: RespType) {
    ctx.body = {
      error: 0,
      data: res ? res : null,
      message: msg ? msg : '请求成功',
    };
    ctx.status = 200;
  },
  error({ ctx, error, errorType }: ErrorRespType) {
    const { message, errno } = globalErrorMessages[errorType];
    ctx.body = {
      errno,
      message,
      ...(error && { error }),
    };
    ctx.status = 200;
  },
};
