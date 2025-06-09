import type { ReactNode } from 'react';

export type Permission = 
  | 'view:api'
  | 'edit:api'
  | 'delete:api'
  | 'create:api'
  | 'view:studio'
  | 'edit:studio'
  | 'import:studio'
  | 'view:services'
  | 'edit:services'
  | 'delete:services'
  | 'create:services';

export type Role = 'admin' | 'developer' | 'viewer';

export interface UserPermissions {
  roles: Role[];
  permissions: Permission[];
}

export interface RouteConfig {
  path: string;
  element: ReactNode;
  children?: RouteConfig[];
  auth?: boolean;
  layout?: boolean;
  permissions?: Permission[];
  roles?: Role[];
}

export interface RouteGroup {
  auth: boolean;
  routes: RouteConfig[];
} 