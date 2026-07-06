import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { HonorCategory } from '@/types/api';

export const honorsApi = {
  getPublicCategories: () =>
    apiClient.get<HonorCategory[]>(ENDPOINTS.HONORS.PUBLIC_CATEGORIES).then((res) => res.data),

  getCategories: () =>
    apiClient.get<HonorCategory[]>(ENDPOINTS.HONORS.CATEGORIES).then((res) => res.data),

  getCategory: (slug: string) =>
    apiClient.get<HonorCategory>(ENDPOINTS.HONORS.CATEGORY(slug)).then((res) => res.data),

  updateCategoryAgents: (slug: string, agentIds: string[]) =>
    apiClient
      .patch<HonorCategory>(ENDPOINTS.HONORS.CATEGORY_AGENTS(slug), { agentIds })
      .then((res) => res.data),
};
