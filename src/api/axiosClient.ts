import axios from 'axios';
import { BASE_URL } from '../constants/env';

export const axiosClient = axios.create({
  baseURL: BASE_URL
});

// APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async (config) => {
  config.headers['Content-Type'] = 'application/json';
  config.withCredentials = true;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error.response;
  }
);

export default axiosClient;
