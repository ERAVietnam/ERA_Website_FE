import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  EMagazine,
  CreateMagazineInput,
  UpdateMagazineInput,
  MagazineFilters,
  PaginatedResponse,
} from '@/types/api';

export const magazinesApi = {
  getMagazines: (filters?: Omit<MagazineFilters, 'status'>) =>
    apiClient.get<PaginatedResponse<EMagazine>>(ENDPOINTS.MAGAZINES.LIST, { params: filters }).then((res) => res.data),

  getAllMagazines: (filters?: MagazineFilters) =>
    apiClient
      .get<PaginatedResponse<EMagazine>>(ENDPOINTS.MAGAZINES.ADMIN_LIST, { params: filters })
      .then((res) => res.data),

  getMagazineById: (id: string) =>
    apiClient.get<EMagazine>(ENDPOINTS.MAGAZINES.DETAIL(id)).then((res) => res.data),

  createMagazine: (data: CreateMagazineInput) =>
    apiClient.post<EMagazine>(ENDPOINTS.MAGAZINES.CREATE, data).then((res) => res.data),

  updateMagazine: (id: string, data: UpdateMagazineInput) =>
    apiClient.patch<EMagazine>(ENDPOINTS.MAGAZINES.UPDATE(id), data).then((res) => res.data),

  deleteMagazine: (id: string) =>
    apiClient.delete<void>(ENDPOINTS.MAGAZINES.DELETE(id)).then((res) => res.data),

  publishMagazine: (id: string) =>
    apiClient.patch<EMagazine>(ENDPOINTS.MAGAZINES.PUBLISH(id)).then((res) => res.data),

  unpublishMagazine: (id: string) =>
    apiClient.patch<EMagazine>(ENDPOINTS.MAGAZINES.UNPUBLISH(id)).then((res) => res.data),
};
