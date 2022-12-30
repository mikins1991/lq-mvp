import axios from 'axios';

import { API_URL } from './api.config';
import { errorCatch } from './error.api';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        return instance.request(originalRequest);
      } catch (error) {}
    }

    throw error;
  }
);
export default instance;
