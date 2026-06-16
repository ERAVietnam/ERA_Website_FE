export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  metaDescription?: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface Media {
  id: string;
  url: string;
  storageKey: string;
  filename: string;
  mimeType?: string | null;
  sizeBytes?: number | null;
  kind?: string | null;
  folder: string;
  referenceId?: string | null;
  referenceType?: string | null;
  altText?: string | null;
  createdAt: string;
}

export interface NewsArticle {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  summary?: string | null;
  content: string;
  featuredImageMediaId?: string | null;
  featuredImage?: Media | null;
  source?: string | null;
  author: { id: string; name: string; email: string } | null;
  authorId: string;
  readTime?: string | null;
  viewCount: number;
  countryCode?: string | null;
  isFeatured: boolean;
  status: 'draft' | 'pending' | 'published';
  metaTitle?: string | null;
  metaDescription?: string | null;
  isIndexed?: boolean | null;
  canonicalUrl?: string | null;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  category: Pick<NewsCategory, 'id' | 'name' | 'slug'>;
}

export interface CreateArticleInput {
  title: string;
  slug: string;
  summary?: string;
  content: string;
  categoryId: string;
  featuredImageMediaId?: string | null;
  source?: string;
  metaTitle?: string;
  metaDescription?: string;
  isIndexed?: boolean;
  canonicalUrl?: string | null;
  status?: 'draft' | 'pending' | 'published';
  isFeatured?: boolean;
  countryCode?: string;
}

export type UpdateArticleInput = Partial<CreateArticleInput>;

export interface NewsArticleLog {
  id: string;
  articleId: string;
  actorId: string;
  actor: { id: string; name: string; email: string };
  eventType: 'created' | 'submitted' | 'updated' | 'published' | 'revoked' | 'rejected';
  fromStatus: 'draft' | 'pending' | 'published' | null;
  toStatus: 'draft' | 'pending' | 'published' | null;
  note?: string | null;
  createdAt: string;
}

export interface ArticleFilters {
  search?: string;
  page?: number;
  limit?: number;
  authorId?: string;
  categoryId?: string;
  categorySlug?: string;
  status?: 'draft' | 'pending' | 'published';
  isFeatured?: boolean;
  publishedFrom?: string;
  publishedTo?: string;
  createdFrom?: string;
  createdTo?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface Permission {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  module: string;
  resource: string;
  scope: string;
  action: string;
  createdAt: string;
}

export interface Account {
  id: string;
  name: string;
  email: string;
  isPasswordChanged: boolean;
  permissions: string[];
}

export interface ManagementAccount {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  isPasswordChanged: boolean;
  createdAt: string;
  updatedAt: string;
  permissions: Permission[];
}

export interface CreateAccountInput {
  name: string;
  email: string;
  password: string;
}

export interface UpdateAccountInput {
  name?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
}

export interface AssignPermissionsInput {
  permissionIds: string[];
}
