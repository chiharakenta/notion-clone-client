import { MemoApi } from '../types/api.type';
import axiosClient from './axiosClient';

export const memoApi = {
  getAll: () => axiosClient.get<MemoApi.GetAll.Response.Success>('memo'),
  create: () => axiosClient.post<MemoApi.Create.Response.Success>('memo')
};
