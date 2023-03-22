import { LoginApi, RegisterApi, VerifyTokenApi } from '../types/api.type';
import { axiosClient } from './axiosClient';

export const authApi = {
  register: (params: RegisterApi.Params) =>
    axiosClient.post<RegisterApi.Response.Success>('auth/register', params),
  login: (params: LoginApi.Params) =>
    axiosClient.post<LoginApi.Response.Success>('auth/login', params),
  verifyToken: () => axiosClient.post<VerifyTokenApi.Response.Success>('auth/verify-token')
};
