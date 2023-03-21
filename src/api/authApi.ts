import { RegisterParams } from '../types/api.type';
import { axiosClient } from './axiosClient';

export const authApi = {
  register: (params: RegisterParams) => axiosClient.post('auth/register', params)
};
