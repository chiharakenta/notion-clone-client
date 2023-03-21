import { UserType } from './user.type';

export type ErrorMessage = {
  value: string;
  msg: string;
  param: string;
  location: string;
};

export namespace RegisterApi {
  export type Params = UserType & {
    confirmPassword: string;
  };
  export namespace Response {
    export type Success = {
      user: UserType & {
        id: number;
      };
      token: string;
    };
    export type Error = {
      data: {
        errors: Array<ErrorMessage>;
      };
    };
  }
}
