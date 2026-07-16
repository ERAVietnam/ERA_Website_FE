import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  AcademyCourse,
  AcademyCourseFilters,
  AcademyCourseTag,
  CreateAcademyCourseInput,
  CreateAcademyCourseTagInput,
  PaginatedResponse,
  UpdateAcademyCourseInput,
  UpdateAcademyCourseTagInput,
} from '@/types/api';

export const academyCoursesApi = {
  getCourses: (filters?: AcademyCourseFilters) =>
    apiClient
      .get<PaginatedResponse<AcademyCourse>>(ENDPOINTS.ACADEMY_COURSES.LIST, {
        params: filters,
      })
      .then((res) => res.data),

  getPublicCourses: (filters?: AcademyCourseFilters) =>
    apiClient
      .get<PaginatedResponse<AcademyCourse>>(ENDPOINTS.ACADEMY_COURSES.PUBLIC_LIST, {
        params: filters,
      })
      .then((res) => res.data),

  getCourseById: (id: string) =>
    apiClient
      .get<AcademyCourse>(ENDPOINTS.ACADEMY_COURSES.DETAIL(id))
      .then((res) => res.data),

  createCourse: (data: CreateAcademyCourseInput) =>
    apiClient
      .post<AcademyCourse>(ENDPOINTS.ACADEMY_COURSES.CREATE, data)
      .then((res) => res.data),

  updateCourse: (id: string, data: UpdateAcademyCourseInput) =>
    apiClient
      .patch<AcademyCourse>(ENDPOINTS.ACADEMY_COURSES.UPDATE(id), data)
      .then((res) => res.data),

  deleteCourse: (id: string) =>
    apiClient.delete<void>(ENDPOINTS.ACADEMY_COURSES.DELETE(id)).then((res) => res.data),

  getTags: () =>
    apiClient.get<AcademyCourseTag[]>(ENDPOINTS.ACADEMY_COURSES.TAGS).then((res) => res.data),

  getPublicTags: () =>
    apiClient
      .get<AcademyCourseTag[]>(ENDPOINTS.ACADEMY_COURSES.PUBLIC_TAGS)
      .then((res) => res.data),

  createTag: (data: CreateAcademyCourseTagInput) =>
    apiClient
      .post<AcademyCourseTag>(ENDPOINTS.ACADEMY_COURSES.TAGS, data)
      .then((res) => res.data),

  updateTag: (id: string, data: UpdateAcademyCourseTagInput) =>
    apiClient
      .patch<AcademyCourseTag>(ENDPOINTS.ACADEMY_COURSES.TAG_DETAIL(id), data)
      .then((res) => res.data),

  deleteTag: (id: string) =>
    apiClient.delete<void>(ENDPOINTS.ACADEMY_COURSES.TAG_DETAIL(id)).then((res) => res.data),
};
