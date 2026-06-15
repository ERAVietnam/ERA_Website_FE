import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  ManagementAccount,
  Permission,
  CreateAccountInput,
  UpdateAccountInput,
  AssignPermissionsInput,
} from '@/types/api';

export const accountsApi = {
  getAccounts: () =>
    apiClient
      .get<ManagementAccount[]>(ENDPOINTS.ACCOUNTS.LIST)
      .then((res) => res.data),

  getAccountById: (id: string) =>
    apiClient
      .get<ManagementAccount>(ENDPOINTS.ACCOUNTS.DETAIL(id))
      .then((res) => res.data),

  createAccount: (data: CreateAccountInput) =>
    apiClient
      .post<ManagementAccount>(ENDPOINTS.ACCOUNTS.CREATE, data)
      .then((res) => res.data),

  updateAccount: (id: string, data: UpdateAccountInput) =>
    apiClient
      .patch<ManagementAccount>(ENDPOINTS.ACCOUNTS.UPDATE(id), data)
      .then((res) => res.data),

  deleteAccount: (id: string) =>
    apiClient
      .delete<void>(ENDPOINTS.ACCOUNTS.DELETE(id))
      .then((res) => res.data),

  getPermissions: () =>
    apiClient
      .get<Permission[]>(ENDPOINTS.ACCOUNTS.PERMISSIONS)
      .then((res) => res.data),

  assignPermissions: (id: string, data: AssignPermissionsInput) =>
    apiClient
      .post<ManagementAccount>(
        ENDPOINTS.ACCOUNTS.ASSIGN_PERMISSIONS(id),
        data,
      )
      .then((res) => res.data),
};
