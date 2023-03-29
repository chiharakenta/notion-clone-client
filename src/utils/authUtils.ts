import { authApi } from '../api/authApi';

export const authUtils = {
  // JWTチェック
  isAuthenticated: async () => {
    try {
      const res = await authApi.verifyToken();
      return res.data.user;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};
