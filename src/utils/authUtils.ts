import { authApi } from '../api/authApi';

export const authUtils = {
  // JWTチェック
  isAuthenticated: async () => {
    try {
      const res = await authApi.verifyToken();
      return res.data.user;
    } catch (_error) {
      return false;
    }
  }
};
