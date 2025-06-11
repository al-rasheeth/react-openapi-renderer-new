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
  OPENAPI_RENDERER: '/openapi-renderer',
  OPENAPI_VALIDATOR: '/openapi-validator',
} as const;

export const ROUTE_META = {
  HOME: {
    title: 'Home',
    breadcrumb: 'Home',
  },
  CATEGORIES: {
    title: 'Categories',
    breadcrumb: 'Categories',
  },
  API_DETAILS: {
    title: 'API Details',
    breadcrumb: 'API Details',
  },
  AUTH: {
    LOGIN: {
      title: 'Login',
      breadcrumb: 'Login',
    },
    REGISTER: {
      title: 'Register',
      breadcrumb: 'Register',
    },
    FORGOT_PASSWORD: {
      title: 'Forgot Password',
      breadcrumb: 'Forgot Password',
    },
  },
  STUDIO: {
    title: 'API Studio',
    breadcrumb: 'API Studio',
  },
  OPENAPI_RENDERER: {
    title: 'OpenAPI Renderer',
    breadcrumb: 'OpenAPI Renderer',
  },
  OPENAPI_VALIDATOR: {
    title: 'OpenAPI Validator',
    breadcrumb: 'OpenAPI Validator',
  },
} as const; 