export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
  WITH_CREDENTIALS: true,
} as const;
