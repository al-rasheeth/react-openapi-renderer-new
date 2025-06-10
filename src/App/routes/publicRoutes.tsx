import { ROUTES, ROUTE_META } from './constants';
import type { RouteConfig } from './types';
import CategoryListPage from '../../Features/api-catalog/pages/CategoryListPage';
import HomePage from '../../Features/home/pages/HomePage';
import ApiDetailsPage from '../../Features/api-catalog/pages/ApiDetailsPage';

export const publicRoutes: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
    layout: true,
    meta: ROUTE_META.HOME,
  },
  {
    path: ROUTES.CATEGORIES,
    element: <CategoryListPage />,
    layout: true,
    meta: ROUTE_META.CATEGORIES,
  },
  {
    path: ROUTES.API_DETAILS,
    element: <ApiDetailsPage />,
    layout: true,
    meta: ROUTE_META.API_DETAILS,
  },
  {
    path: ROUTES.AUTH.LOGIN,
    element: <div>Login Page (Coming Soon)</div>,
    layout: false,
    meta: ROUTE_META.AUTH.LOGIN,
  },
  {
    path: ROUTES.AUTH.REGISTER,
    element: <div>Register Page (Coming Soon)</div>,
    layout: false,
    meta: ROUTE_META.AUTH.REGISTER,
  },
  {
    path: ROUTES.AUTH.FORGOT_PASSWORD,
    element: <div>Forgot Password Page (Coming Soon)</div>,
    layout: false,
    meta: ROUTE_META.AUTH.FORGOT_PASSWORD,
  },
]; 