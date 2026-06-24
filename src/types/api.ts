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
  displayPublishedAt?: string;
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
  displayPublishedAt?: string;
  status?: 'draft' | 'pending' | 'published';
  isFeatured?: boolean;
  countryCode?: string;
}

export type UpdateArticleInput = Partial<CreateArticleInput>;

export type EMagazineStatus = 'draft' | 'published';

export interface EMagazine {
  id: string;
  title: string;
  description?: string | null;
  pdfMediaId: string;
  pdfMedia: Media;
  coverImageMediaId: string;
  coverImageMedia: Media;
  publishedDate?: string | null;
  status: EMagazineStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMagazineInput {
  title: string;
  description?: string;
  pdfMediaId: string;
  coverImageMediaId?: string | null;
  publishedDate?: string | null;
  status?: EMagazineStatus;
}

export type UpdateMagazineInput = Partial<CreateMagazineInput>;

export interface MagazineFilters {
  page?: number;
  limit?: number;
  status?: EMagazineStatus;
  search?: string;
}

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

export interface AccountFilters {
  search?: string;
  page?: number;
  limit?: number;
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

export type JobStatus = 'draft' | 'open' | 'closed';

export interface JobPosting {
  id: string;
  authorId: string;
  title: string;
  slug: string;
  location: string;
  type: string;
  workMode?: string | null;
  experience?: string | null;
  salary?: string | null;
  workingTime?: string | null;
  quantity: number;
  deadline?: string | null;
  status: JobStatus;
  description: string;
  requirements: string;
  benefits: string;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  author: { id: string; name: string; email: string } | null;
}

export interface CreateJobInput {
  title: string;
  slug: string;
  location: string;
  type: string;
  workMode?: string;
  experience?: string;
  salary?: string;
  workingTime?: string;
  quantity?: number;
  deadline?: string;
  description: string;
  requirements: string;
  benefits: string;
}

export type UpdateJobInput = Partial<CreateJobInput>;

export interface JobFilters {
  search?: string;
  page?: number;
  limit?: number;
  authorId?: string;
  status?: JobStatus;
  location?: string;
  publishedFrom?: string;
  publishedTo?: string;
  createdFrom?: string;
  createdTo?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface JobPostingLog {
  id: string;
  jobId: string;
  actorId: string;
  actor: { id: string; name: string; email: string };
  eventType: 'created' | 'published' | 'unpublished' | 'closed' | 'updated';
  fromStatus: JobStatus | null;
  toStatus: JobStatus | null;
  note?: string | null;
  createdAt: string;
}

export type ApplicationStatus = 'new' | 'reviewing' | 'contacting' | 'interview' | 'on_hold' | 'hired' | 'rejected';

export interface JobApplication {
  id: string;
  jobPostingId: string;
  fullName: string;
  phone: string;
  email?: string | null;
  portfolioUrl?: string | null;
  cvMediaId?: string | null;
  status: ApplicationStatus;
  cvMedia?: {
    id: string;
    url: string;
    filename: string;
    mimeType?: string | null;
  } | null;
  jobPosting: {
    id: string;
    title: string;
    slug: string;
  };
  appliedAt: string;
  createdAt: string;
}

export interface CreateJobApplicationInput {
  jobPostingId: string;
  fullName: string;
  phone: string;
  email?: string;
  portfolioUrl?: string;
  cvMediaId?: string;
}

export interface JobApplicationFilters {
  search?: string;
  jobPostingId?: string;
  status?: ApplicationStatus;
  page?: number;
  limit?: number;
}

export interface UpdateApplicationStatusInput {
  status: ApplicationStatus;
}

export interface UpdateApplicationInput {
  jobPostingId?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  portfolioUrl?: string;
  cvMediaId?: string;
}

export interface JobApplicationLog {
  id: string;
  applicationId: string;
  status?: ApplicationStatus | null;
  fromStatus?: ApplicationStatus | null;
  toStatus?: ApplicationStatus | null;
  note?: string | null;
  actor: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export type ProjectType = 'apartment' | 'townhouse' | 'villa' | 'land';
export type ProjectStatus = 'new' | 'booking' | 'selling' | 'upcoming' | 'handed_over';
export type ProjectPublicationStatus = 'draft' | 'pending' | 'published';
export type ProjectLogEventType = 'created' | 'submitted' | 'updated' | 'published' | 'revoked' | 'rejected' | 'deleted';

export interface Project {
  id: string;
  name: string;
  projectName?: string | null;
  slug: string;
  type: ProjectType;
  status: ProjectStatus;
  location: string;
  imageMediaId?: string | null;
  imageMedia?: Media | null;
  investor?: string | null;
  ownership?: string | null;
  area?: string | null;
  density?: string | null;
  scale?: string | null;
  startYear?: string | null;
  progress?: string | null;
  content?: string | null;
  isIndexed: boolean;
  canonicalUrl?: string | null;
  publicationStatus: ProjectPublicationStatus;
  publishedAt?: string | null;
  createdById: string;
  createdBy: { id: string; name: string; email: string } | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectLog {
  id: string;
  projectId: string;
  actorId: string;
  actor: { id: string; name: string; email: string };
  eventType: ProjectLogEventType;
  fromStatus: ProjectStatus | null;
  toStatus: ProjectStatus | null;
  note?: string | null;
  createdAt: string;
}

export interface CreateProjectInput {
  name: string;
  projectName?: string;
  slug: string;
  type: ProjectType;
  status: ProjectStatus;
  location: string;
  imageMediaId?: string | null;
  investor?: string;
  ownership?: string;
  area?: string;
  density?: string;
  scale?: string;
  startYear?: string;
  progress?: string;
  content?: string;
  isIndexed?: boolean;
  canonicalUrl?: string | null;
  publicationStatus?: ProjectPublicationStatus;
}

export type UpdateProjectInput = Partial<CreateProjectInput>;

export interface ProjectFilters {
  search?: string;
  type?: ProjectType;
  status?: ProjectStatus;
  publicationStatus?: ProjectPublicationStatus;
  page?: number;
  limit?: number;
}
