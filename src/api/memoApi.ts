import { MemoApi } from '../types/api.type';
import axiosClient from './axiosClient';

export const memoApi = {
  getAll: () => axiosClient.get<MemoApi.GetAll.Response.Success>('memo'),
  getOne: (memoId: string) => axiosClient.get<MemoApi.GetOne.Response.Success>(`memo/${memoId}`),
  create: () => axiosClient.post<MemoApi.Create.Response.Success>('memo'),
  update: (memoId: string, params: MemoApi.Update.Request.Params) =>
    axiosClient.put<MemoApi.Update.Response.Success>(`memo/${memoId}`, params),
  updatePosition: (params: MemoApi.UpdatePosition.Request.Params) =>
    axiosClient.put<MemoApi.UpdatePosition.Response.Success>('/memo/position', params),
  delete: (memoId: string) => axiosClient.delete<MemoApi.Delete.Response.Success>(`memo/${memoId}`)
};
