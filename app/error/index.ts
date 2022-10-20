import { userErrorMessages } from './user';
import { workErrorMessages } from './work';

export type GlobErrorTypes = keyof (typeof userErrorMessages & typeof workErrorMessages);
export const globalErrorMessages = {
  ...userErrorMessages,
  ...workErrorMessages,
};
