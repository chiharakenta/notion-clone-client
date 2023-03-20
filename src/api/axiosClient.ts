import axios, { InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';

const getToken = () => localStorage.getItem('token');

const axiosClient = axios.create({
  baseURL: BASE_URL
});

// APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async (config) => {
  config.headers['Content-Type'] = 'application/json';
  config.headers.Authorization = getToken();
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error.response;
  }
);

export default axiosClient;
