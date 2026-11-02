import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { ApiKey, CreateApiKeyInput } from '@/types/api';

interface ApiKeySecretResponse extends ApiKey {
  apiKey: string;
  warning: string;
}

export const apiKeysApi = {
  getApiKeys: () =>
    apiClient.get<ApiKey[]>(ENDPOINTS.API_KEYS.LIST).then((res) => res.data),

  createApiKey: (data: CreateApiKeyInput) =>
    apiClient
      .post<ApiKeySecretResponse>(ENDPOINTS.API_KEYS.CREATE, data)
      .then((res) => res.data),

  rotateApiKey: (id: string) =>
    apiClient
      .post<ApiKeySecretResponse>(ENDPOINTS.API_KEYS.ROTATE(id))
      .then((res) => res.data),

  revokeApiKey: (id: string) =>
    apiClient
      .patch<ApiKey>(ENDPOINTS.API_KEYS.REVOKE(id))
      .then((res) => res.data),
};
