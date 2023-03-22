import { UserType } from './user.type';

export type ErrorMessage = {
  value: string;
  msg: string;
  param: 'username' | 'password' | 'confirmPassword';
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
export namespace LoginApi {
  export type Params = UserType;
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
