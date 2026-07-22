import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  AnnualHonorFilters,
  AnnualHonorList,
  CreateAnnualHonorInput,
  PaginatedResponse,
  UpdateAnnualHonorInput,
} from '@/types/api';

export const annualHonorsApi = {
  getPublicLists: (filters?: AnnualHonorFilters) =>
    apiClient
      .get<PaginatedResponse<AnnualHonorList>>(ENDPOINTS.ANNUAL_HONORS.PUBLIC_LIST, {
        params: filters,
      })
      .then((res) => res.data),

  getLists: (filters?: AnnualHonorFilters) =>
    apiClient
      .get<PaginatedResponse<AnnualHonorList>>(ENDPOINTS.ANNUAL_HONORS.LIST, {
        params: filters,
      })
      .then((res) => res.data),

  getListById: (id: string) =>
    apiClient
      .get<AnnualHonorList>(ENDPOINTS.ANNUAL_HONORS.DETAIL(id))
      .then((res) => res.data),

  createList: (data: CreateAnnualHonorInput) =>
    apiClient
      .post<AnnualHonorList>(ENDPOINTS.ANNUAL_HONORS.CREATE, data)
      .then((res) => res.data),

  updateList: (id: string, data: UpdateAnnualHonorInput) =>
    apiClient
      .patch<AnnualHonorList>(ENDPOINTS.ANNUAL_HONORS.UPDATE(id), data)
      .then((res) => res.data),

  updateCategoryAgents: (id: string, slug: string, agentIds: string[]) =>
    apiClient
      .patch<AnnualHonorList>(ENDPOINTS.ANNUAL_HONORS.CATEGORY_AGENTS(id, slug), {
        agentIds,
      })
      .then((res) => res.data),

  deleteList: (id: string) =>
    apiClient
      .delete<void>(ENDPOINTS.ANNUAL_HONORS.DELETE(id))
      .then((res) => res.data),
};
