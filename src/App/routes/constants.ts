export const ROUTES = {
  HOME: '/',
  CATEGORIES: '/categories',
  CATEGORY_DETAILS: '/categories/:id',
  SERVICES: '/services',
  SERVICE_DETAILS: '/services/:id',
  API_DETAILS: '/api/:id',
  STUDIO: '/studio',
  STUDIO_IMPORT: '/studio/import',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
} as const; 