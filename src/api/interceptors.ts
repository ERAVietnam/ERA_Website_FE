import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { ApiError, ApiResponse } from './types';
import { authApi } from './domains/auth';
import { ENDPOINTS } from './endpoints';

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

function isSuccessStatus(status: string) {
  return status === 'success' || status.startsWith('success.');
}

function isAuthRecoveryEndpoint(url?: string) {
  if (!url) return false;
  return url.includes(ENDPOINTS.AUTH.LOGIN) || url.includes(ENDPOINTS.AUTH.REFRESH);
}

export function setupInterceptors(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse<unknown>>) => {
      if (response.data && 'status' in response.data && !isSuccessStatus(response.data.status)) {
        return Promise.reject(response.data);
      }

      if (response.data && 'data' in response.data) {
        return { ...response, data: response.data.data };
      }
      return response;
    },
    async (error: AxiosError<ApiError>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !isAuthRecoveryEndpoint(originalRequest.url)
      ) {
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
