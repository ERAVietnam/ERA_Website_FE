import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  Project,
  ProjectLog,
  CreateProjectInput,
  UpdateProjectInput,
  ProjectFilters,
  PaginatedResponse,
  ProjectFaqInput,
} from '@/types/api';

export const projectsApi = {
  getProjects: (filters?: ProjectFilters) =>
    apiClient.get<PaginatedResponse<Project>>(ENDPOINTS.PROJECTS.LIST, { params: filters }).then((res) => res.data),

  getPublishedProjects: (filters?: ProjectFilters) =>
    apiClient.get<PaginatedResponse<Project>>(ENDPOINTS.PROJECTS.PUBLISHED, { params: filters }).then((res) => res.data),

  getProjectById: (id: string) =>
    apiClient.get<Project>(ENDPOINTS.PROJECTS.DETAIL(id)).then((res) => res.data),

  getProjectBySlug: (slug: string) =>
    apiClient.get<Project>(ENDPOINTS.PROJECTS.DETAIL_BY_SLUG(slug)).then((res) => res.data),

  getProjectLogs: (id: string) =>
    apiClient.get<ProjectLog[]>(ENDPOINTS.PROJECTS.LOGS(id)).then((res) => res.data),

  createProject: (data: CreateProjectInput) =>
    apiClient.post<Project>(ENDPOINTS.PROJECTS.CREATE, data).then((res) => res.data),

  updateProject: (id: string, data: UpdateProjectInput) =>
    apiClient.patch<Project>(ENDPOINTS.PROJECTS.UPDATE(id), data).then((res) => res.data),

  updateProjectFaqs: (id: string, faqs: ProjectFaqInput[]) =>
    apiClient.patch<Project>(ENDPOINTS.PROJECTS.FAQS(id), { faqs }).then((res) => res.data),

  submitProjectForReview: (id: string, note?: string) =>
    apiClient.post<Project>(ENDPOINTS.PROJECTS.SUBMIT(id), { note }).then((res) => res.data),

  publishProject: (id: string, note?: string) =>
    apiClient.post<Project>(ENDPOINTS.PROJECTS.PUBLISH(id), { note }).then((res) => res.data),

  rejectProject: (id: string, note?: string) =>
    apiClient.post<Project>(ENDPOINTS.PROJECTS.REJECT(id), { note }).then((res) => res.data),

  revokeProject: (id: string, note?: string) =>
    apiClient.post<Project>(ENDPOINTS.PROJECTS.REVOKE(id), { note }).then((res) => res.data),

  deleteProject: (id: string) =>
    apiClient.delete<void>(ENDPOINTS.PROJECTS.DELETE(id)).then((res) => res.data),
};
