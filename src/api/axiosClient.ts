import axios, { InternalAxiosRequestConfig } from 'axios';
import { BASE_URL } from '../constants/env';

// Fix: 開発用と本番用で分けられるように修正
const getToken = () => localStorage.getItem('token');

export const axiosClient = axios.create({
  baseURL: BASE_URL
});

// APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async (config) => {
  config.headers['Content-Type'] = 'application/json';
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error.response;
  }
);

export default axiosClient;
