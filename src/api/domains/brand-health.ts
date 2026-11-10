import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { BrandHealthReport } from '@/types/api';

export const brandHealthApi = {
  list: () => apiClient.get<BrandHealthReport[]>(ENDPOINTS.BRAND_HEALTH.LIST).then((res) => res.data),
  detail: (reportNo: string) => apiClient.get<BrandHealthReport>(ENDPOINTS.BRAND_HEALTH.DETAIL(reportNo)).then((res) => res.data),
  html: (reportNo: string) => apiClient.get<string>(ENDPOINTS.BRAND_HEALTH.HTML(reportNo), { responseType: 'text' }).then((res) => res.data),
  pdf: (date: string) => apiClient.get<Blob>(ENDPOINTS.BRAND_HEALTH.PDF(date), { responseType: 'blob' }).then((res) => res.data),
};
