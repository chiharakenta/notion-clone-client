import { UserType } from './user.type';

export type RegisterParams = UserType & {
  confirmPassword: string;
};
