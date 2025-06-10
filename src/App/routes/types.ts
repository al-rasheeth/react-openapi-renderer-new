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

export interface RouteMeta {
  title?: string;
  breadcrumb?: string;
  icon?: ReactNode;
  requiresAuth?: boolean;
  roles?: string[];
  permissions?: string[];
}

export interface RouteConfig {
  path: string;
  element: ReactNode;
  layout?: boolean;
  meta?: RouteMeta;
  children?: RouteConfig[];
}

export interface RouteGuardProps {
  route: RouteConfig;
  children: ReactNode;
}

export interface RouteGroup {
  auth: boolean;
  routes: RouteConfig[];
} 