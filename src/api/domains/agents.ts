import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  Agent,
  AgentFilters,
  CreateAgentInput,
  PaginatedResponse,
  UpdateAgentInput,
} from '@/types/api';

export const agentsApi = {
  getAgents: (filters?: AgentFilters) =>
    apiClient.get<PaginatedResponse<Agent>>(ENDPOINTS.AGENTS.LIST, { params: filters }).then((res) => res.data),

  getAgentById: (id: string) =>
    apiClient.get<Agent>(ENDPOINTS.AGENTS.DETAIL(id)).then((res) => res.data),

  createAgent: (data: CreateAgentInput) =>
    apiClient.post<Agent>(ENDPOINTS.AGENTS.CREATE, data).then((res) => res.data),

  updateAgent: (id: string, data: UpdateAgentInput) =>
    apiClient.patch<Agent>(ENDPOINTS.AGENTS.UPDATE(id), data).then((res) => res.data),

  deleteAgent: (id: string) =>
    apiClient.delete<void>(ENDPOINTS.AGENTS.DELETE(id)).then((res) => res.data),
};
