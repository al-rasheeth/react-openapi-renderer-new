import { ROUTES, ROUTE_META } from './constants';
import type { RouteConfig } from './types';
import ServiceListPage from '../../Features/api-catalog/pages/ServiceListPage';
import ApiDetailsPage from '../../Features/api-catalog/pages/ApiDetailsPage';

export const protectedRoutes: RouteConfig[] = [
  {
    path: ROUTES.STUDIO,
    element: <div>API Studio (Coming Soon)</div>,
    layout: true,
    meta: {
      ...ROUTE_META.STUDIO,
      permissions: ['view:studio'],
    },
  },
  {
    path: ROUTES.STUDIO_IMPORT,
    element: <div>API Studio Import (Coming Soon)</div>,
    layout: true,
    meta: {
      ...ROUTE_META.API_DETAILS,
      permissions: ['import:studio'],
      roles: ['admin', 'developer'],
    },
  },
  {
    path: ROUTES.SERVICES,
    element: <ServiceListPage />,
    layout: true,
    meta: {
      ...ROUTE_META.API_DETAILS,
      permissions: ['view:services'],
    },
  },
  {
    path: ROUTES.SERVICE_DETAILS,
    element: <div>Service Details (Coming Soon)</div>,
    layout: true,
    meta: {
      ...ROUTE_META.API_DETAILS,
      permissions: ['view:services'],
    },
  },
  {
    path: ROUTES.API_DETAILS,
    element: <ApiDetailsPage />,
    layout: true,
    meta: {
      ...ROUTE_META.API_DETAILS,
      permissions: ['view:api'],
    },
  },
]; 