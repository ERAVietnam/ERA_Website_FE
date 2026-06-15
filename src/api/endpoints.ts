export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    CHANGE_PASSWORD: '/auth/change-password',
    ME: '/auth/me',
  },
  NEWS: {
    CATEGORIES: '/articles/categories',
    LIST: '/articles',
    PUBLISHED: '/articles/published',
    DETAIL: (id: string) => `/articles/${id}`,
    DETAIL_BY_SLUG: (categorySlug: string, slug: string) => `/articles/by-slug/${categorySlug}/${slug}`,
    CREATE: '/articles',
    UPDATE: (id: string) => `/articles/${id}`,
    DELETE: (id: string) => `/articles/${id}`,
    LOGS: (id: string) => `/articles/${id}/logs`,
  },
  MEDIA: {
    UPLOAD: '/media/upload',
    DELETE: (id: string) => `/media/${id}`,
    LIST: '/media',
  },
  ACCOUNTS: {
    LIST: '/accounts',
    DETAIL: (id: string) => `/accounts/${id}`,
    CREATE: '/accounts',
    UPDATE: (id: string) => `/accounts/${id}`,
    DELETE: (id: string) => `/accounts/${id}`,
    PERMISSIONS: '/accounts/permissions',
    ASSIGN_PERMISSIONS: (id: string) => `/accounts/${id}/permissions`,
  },
} as const;
