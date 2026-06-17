import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  JobPosting,
  JobPostingLog,
  CreateJobInput,
  UpdateJobInput,
  JobFilters,
  JobStatus,
  PaginatedResponse,
} from '@/types/api';

export const recruitmentApi = {
  getJobs: (filters?: JobFilters) =>
    apiClient.get<PaginatedResponse<JobPosting>>(ENDPOINTS.RECRUITMENT.LIST, { params: filters }).then((res) => res.data),

  getPublishedJobs: (params?: { limit?: number; location?: string }) =>
    apiClient.get<JobPosting[]>(ENDPOINTS.RECRUITMENT.PUBLISHED, { params }).then((res) => res.data),

  getJobById: (id: string) =>
    apiClient.get<JobPosting>(ENDPOINTS.RECRUITMENT.DETAIL(id)).then((res) => res.data),

  getJobBySlug: (slug: string) =>
    apiClient.get<JobPosting>(ENDPOINTS.RECRUITMENT.DETAIL_BY_SLUG(slug)).then((res) => res.data),

  getJobLogs: (id: string) =>
    apiClient.get<JobPostingLog[]>(ENDPOINTS.RECRUITMENT.LOGS(id)).then((res) => res.data),

  createJob: (data: CreateJobInput) =>
    apiClient.post<JobPosting>(ENDPOINTS.RECRUITMENT.CREATE, data).then((res) => res.data),

  updateJob: (id: string, data: UpdateJobInput) =>
    apiClient.patch<JobPosting>(ENDPOINTS.RECRUITMENT.UPDATE(id), data).then((res) => res.data),

  updateJobStatus: (id: string, status: JobStatus) =>
    apiClient.patch<JobPosting>(ENDPOINTS.RECRUITMENT.STATUS(id), { status }).then((res) => res.data),

  deleteJob: (id: string) =>
    apiClient.delete<void>(ENDPOINTS.RECRUITMENT.DELETE(id)).then((res) => res.data),
};
