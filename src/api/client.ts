import axios from 'axios';
import { API_CONFIG } from './config';
import { setupInterceptors } from './interceptors';

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
  withCredentials: API_CONFIG.WITH_CREDENTIALS,
});

setupInterceptors(apiClient);
