export interface ApiCategory {
  id: string;
  name: string;
  description: string;
}

export interface ApiService {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'deprecated' | 'beta';
}

export interface ApiDetails {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  parameters: ApiParameter[];
  responses: ApiResponse[];
}

export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ApiResponse {
  status: number;
  description: string;
  schema: Record<string, any>;
} 