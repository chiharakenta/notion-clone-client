import { MemoModel } from './memo.type';
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

export namespace VerifyTokenApi {
  export namespace Response {
    export type Success = {
      user: UserType & {
        id: number;
      };
    };
    export type Error = {
      data: '権限がありません。';
    };
  }
}

export namespace MemoApi {
  export namespace GetAll {
    export namespace Response {
      export type Success = {
        memos: Array<MemoModel>;
      };
    }
  }

  export namespace Create {
    export namespace Response {
      export type Success = {
        memo: MemoModel;
      };
    }
  }
}
