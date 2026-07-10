import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  CreateMonthlyHonorInput,
  MonthlyHonorFilters,
  MonthlyHonorList,
  PaginatedResponse,
  UpdateMonthlyHonorInput,
} from '@/types/api';

export const monthlyHonorsApi = {
  getPublicLists: (filters?: MonthlyHonorFilters) =>
    apiClient
      .get<PaginatedResponse<MonthlyHonorList>>(ENDPOINTS.MONTHLY_HONORS.PUBLIC_LIST, {
        params: filters,
      })
      .then((res) => res.data),

  getLists: (filters?: MonthlyHonorFilters) =>
    apiClient
      .get<PaginatedResponse<MonthlyHonorList>>(ENDPOINTS.MONTHLY_HONORS.LIST, {
        params: filters,
      })
      .then((res) => res.data),

  getListById: (id: string) =>
    apiClient
      .get<MonthlyHonorList>(ENDPOINTS.MONTHLY_HONORS.DETAIL(id))
      .then((res) => res.data),

  createList: (data: CreateMonthlyHonorInput) =>
    apiClient
      .post<MonthlyHonorList>(ENDPOINTS.MONTHLY_HONORS.CREATE, data)
      .then((res) => res.data),

  updateList: (id: string, data: UpdateMonthlyHonorInput) =>
    apiClient
      .patch<MonthlyHonorList>(ENDPOINTS.MONTHLY_HONORS.UPDATE(id), data)
      .then((res) => res.data),

  deleteList: (id: string) =>
    apiClient
      .delete<void>(ENDPOINTS.MONTHLY_HONORS.DELETE(id))
      .then((res) => res.data),
};
