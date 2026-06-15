import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { Account } from '@/types/api';

export interface LoginInput {
  email: string;
  password: string;
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export interface LoginResponse {
  account: Account;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  login: (data: LoginInput) =>
    apiClient.post<LoginResponse>(ENDPOINTS.AUTH.LOGIN, data).then((res) => res.data),

  logout: () => apiClient.post<void>(ENDPOINTS.AUTH.LOGOUT).then((res) => res.data),

  refresh: (refreshToken: string) =>
    apiClient.post<RefreshResponse>(ENDPOINTS.AUTH.REFRESH, { refreshToken }).then((res) => res.data),

  changePassword: (data: ChangePasswordInput) =>
    apiClient.post<void>(ENDPOINTS.AUTH.CHANGE_PASSWORD, data).then((res) => res.data),

  me: () => apiClient.get<Account>(ENDPOINTS.AUTH.ME).then((res) => res.data),
};
