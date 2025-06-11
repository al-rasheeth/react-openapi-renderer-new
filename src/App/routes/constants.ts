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
  OPENAPI_RENDERER: '/openapi/renderer',
  OPENAPI_VALIDATOR: '/openapi/validator',
  OPENAPI_EDITOR: '/openapi/editor',
} as const;

export const ROUTE_META = {
  HOME: {
    title: 'Home',
    description: 'Welcome to the API Catalog',
  },
  CATEGORIES: {
    title: 'Categories',
    description: 'Browse API categories',
  },
  API_DETAILS: {
    title: 'API Details',
    description: 'View API details',
  },
  AUTH: {
    LOGIN: {
      title: 'Login',
      description: 'Login to your account',
    },
    REGISTER: {
      title: 'Register',
      description: 'Create a new account',
    },
    FORGOT_PASSWORD: {
      title: 'Forgot Password',
      description: 'Reset your password',
    },
  },
  STUDIO: {
    title: 'API Studio',
    breadcrumb: 'API Studio',
  },
  OPENAPI_RENDERER: {
    title: 'OpenAPI Renderer',
    description: 'View OpenAPI documentation',
  },
  OPENAPI_VALIDATOR: {
    title: 'OpenAPI Validator',
    description: 'Validate OpenAPI specifications',
  },
  OPENAPI_EDITOR: {
    title: 'OpenAPI Editor',
    description: 'Edit and preview OpenAPI specifications',
  },
} as const; 