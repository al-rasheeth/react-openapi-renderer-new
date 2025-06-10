import { ROUTES } from './constants';
import type { RouteConfig } from './types';
import ServiceListPage from '../../Features/api-catalog/pages/ServiceListPage';

export const protectedRoutes: RouteConfig[] = [
  {
    path: ROUTES.STUDIO,
    element: <div>API Studio (Coming Soon)</div>,
    layout: true,
    auth: true,
    permissions: ['view:studio'],
  },
  {
    path: ROUTES.STUDIO_IMPORT,
    element: <div>API Studio Import (Coming Soon)</div>,
    layout: true,
    auth: true,
    permissions: ['import:studio'],
    roles: ['admin', 'developer'],
  },
  {
    path: ROUTES.SERVICES,
    element: <ServiceListPage />,
    layout: true,
    auth: true,
    permissions: ['view:services'],
  },
  {
    path: ROUTES.SERVICE_DETAILS,
    element: <div>Service Details (Coming Soon)</div>,
    layout: true,
    auth: true,
    permissions: ['view:services'],
  },
  {
    path: ROUTES.API_DETAILS,
    element: <div>API Details (Coming Soon)</div>,
    layout: true,
    auth: true,
    permissions: ['view:api'],
  },
]; 