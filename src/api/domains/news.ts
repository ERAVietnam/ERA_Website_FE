import { apiClient } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  NewsArticle,
  NewsArticleLog,
  NewsCategory,
  CreateArticleInput,
  UpdateArticleInput,
  NewsFaqInput,
  ArticleFilters,
  PaginatedResponse,
} from '@/types/api';

export const newsApi = {
  getCategories: () =>
    apiClient.get<NewsCategory[]>(ENDPOINTS.NEWS.CATEGORIES).then((res) => res.data),

  getArticles: (filters?: ArticleFilters) =>
    apiClient.get<PaginatedResponse<NewsArticle>>(ENDPOINTS.NEWS.LIST, { params: filters }).then((res) => res.data),

  getPublishedArticles: (filters?: Omit<ArticleFilters, 'status'> & { excludeId?: string; limit?: number }) =>
    apiClient.get<NewsArticle[]>(ENDPOINTS.NEWS.PUBLISHED, { params: filters }).then((res) => res.data),

  getArticleById: (id: string) =>
    apiClient.get<NewsArticle>(ENDPOINTS.NEWS.DETAIL(id)).then((res) => res.data),

  getArticleLogs: (id: string) =>
    apiClient.get<NewsArticleLog[]>(ENDPOINTS.NEWS.LOGS(id)).then((res) => res.data),

  getArticleBySlug: (slug: string) =>
    apiClient.get<NewsArticle>(ENDPOINTS.NEWS.DETAIL_BY_SLUG(slug)).then((res) => res.data),

  createArticle: (data: CreateArticleInput) =>
    apiClient.post<NewsArticle>(ENDPOINTS.NEWS.CREATE, data).then((res) => res.data),

  updateArticle: (id: string, data: UpdateArticleInput) =>
    apiClient.patch<NewsArticle>(ENDPOINTS.NEWS.UPDATE(id), data).then((res) => res.data),

  updateArticleFaqs: (id: string, faqs: NewsFaqInput[]) =>
    apiClient.patch<NewsArticle>(ENDPOINTS.NEWS.FAQS(id), { faqs }).then((res) => res.data),

  deleteArticle: (id: string) =>
    apiClient.delete<void>(ENDPOINTS.NEWS.DELETE(id)).then((res) => res.data),

  publishArticle: (id: string) =>
    apiClient.patch<NewsArticle>(ENDPOINTS.NEWS.UPDATE(id) + '/publish').then((res) => res.data),

  revokeArticle: (id: string) =>
    apiClient.patch<NewsArticle>(ENDPOINTS.NEWS.UPDATE(id) + '/revoke').then((res) => res.data),
};
