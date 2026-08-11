import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  Author,
  AuthorFilters,
  AuthorOption,
  AuthorPublicArticle,
  AuthorPublicArticlesFilters,
  AuthorPublicListItem,
  CreateAuthorInput,
  PaginatedResponse,
  UpdateAuthorInput,
} from '@/types/api';

export const authorsApi = {
  getAuthors: (filters?: AuthorFilters) =>
    apiClient
      .get<PaginatedResponse<Author>>(ENDPOINTS.AUTHORS.LIST, { params: filters })
      .then((res) => res.data),
  getAuthorById: (id: string) =>
    apiClient.get<Author>(ENDPOINTS.AUTHORS.DETAIL(id)).then((res) => res.data),
  getAuthorOptions: () =>
    apiClient.get<AuthorOption[]>(ENDPOINTS.AUTHORS.OPTIONS).then((res) => res.data),
  createAuthor: (data: CreateAuthorInput) =>
    apiClient.post<Author>(ENDPOINTS.AUTHORS.CREATE, data).then((res) => res.data),
  updateAuthor: (id: string, data: UpdateAuthorInput) =>
    apiClient.patch<Author>(ENDPOINTS.AUTHORS.UPDATE(id), data).then((res) => res.data),
  deleteAuthor: (id: string) =>
    apiClient.delete<void>(ENDPOINTS.AUTHORS.DELETE(id)).then((res) => res.data),

  getPublicList: () =>
    apiClient.get<AuthorPublicListItem[]>(ENDPOINTS.AUTHORS.PUBLIC_LIST).then((res) => res.data),
  getPublicBySlug: (slug: string) =>
    apiClient.get<Author>(ENDPOINTS.AUTHORS.PUBLIC_DETAIL(slug)).then((res) => res.data),
  getPublicArticles: (slug: string, filters?: AuthorPublicArticlesFilters) =>
    apiClient
      .get<PaginatedResponse<AuthorPublicArticle>>(ENDPOINTS.AUTHORS.PUBLIC_ARTICLES(slug), {
        params: filters,
      })
      .then((res) => res.data),
};
