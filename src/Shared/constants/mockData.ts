import type { ApiCategory, ApiService, ApiDetails } from '../types/api';

export const mockCategories: ApiCategory[] = [
  {
    id: '1',
    name: 'Authentication',
    description: 'APIs for user authentication and authorization',
  },
  {
    id: '2',
    name: 'User Management',
    description: 'APIs for managing user profiles and settings',
  },
  {
    id: '3',
    name: 'Data Analytics',
    description: 'APIs for data processing and analytics',
  },
];

export const mockServices: ApiService[] = [
  {
    id: '1',
    categoryId: '1',
    name: 'OAuth2 Service',
    description: 'OAuth2 authentication service',
    version: '1.0.0',
    status: 'active',
  },
  {
    id: '2',
    categoryId: '1',
    name: 'JWT Service',
    description: 'JWT token management service',
    version: '2.0.0',
    status: 'active',
  },
  {
    id: '3',
    categoryId: '2',
    name: 'User Profile Service',
    description: 'User profile management service',
    version: '1.0.0',
    status: 'active',
  },
];

export const mockApiDetails: ApiDetails[] = [
  {
    id: '1',
    serviceId: '1',
    name: 'Get Access Token',
    description: 'Get OAuth2 access token',
    endpoint: '/oauth/token',
    method: 'POST',
    parameters: [
      {
        name: 'grant_type',
        type: 'string',
        required: true,
        description: 'Type of grant',
      },
      {
        name: 'client_id',
        type: 'string',
        required: true,
        description: 'Client ID',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Success',
        schema: {
          access_token: 'string',
          token_type: 'string',
          expires_in: 'number',
        },
      },
    ],
  },
]; 