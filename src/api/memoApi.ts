import { MemoApi } from '../types/api.type';
import axiosClient from './axiosClient';

export const memoApi = {
  create: () => axiosClient.post<MemoApi.Response.Success>('memo')
};
