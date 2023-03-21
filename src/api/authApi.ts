import { RegisterApi } from '../types/api.type';
import { axiosClient } from './axiosClient';

export const authApi = {
  register: (params: RegisterApi.Params) =>
    axiosClient.post<RegisterApi.Response.Success>('auth/register', params)
};
