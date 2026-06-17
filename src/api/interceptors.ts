import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { ApiError, ApiResponse } from './types';
import { authApi } from './domains/auth';

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

export function setupInterceptors(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse<unknown>>) => {
      if (response.data && 'data' in response.data) {
        return { ...response, data: response.data.data };
      }
      return response;
    },
    async (error: AxiosError<ApiError>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = authApi
            .refresh()
            .then(() => {
              // Refresh endpoint sets new HttpOnly cookies.
              // The retry will automatically include them via withCredentials.
            })
            .catch(() => {
              // Refresh failed — session expired.
              // Reject so callers (e.g. fetchMe) can update UI / redirect.
              throw new Error('Session expired');
            })
            .finally(() => {
              isRefreshing = false;
              refreshPromise = null;
            });
        }

        if (refreshPromise) {
          try {
            await refreshPromise;
            return instance(originalRequest);
          } catch {
            const apiError = error.response?.data ?? { status: 'error.unknown', data: null };
            return Promise.reject(apiError);
          }
        }
      }

      const apiError = error.response?.data ?? { status: 'error.unknown', data: null };
      return Promise.reject(apiError);
    },
  );
}
