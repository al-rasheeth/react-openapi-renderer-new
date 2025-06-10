import { ROUTES } from './constants';
import type { RouteConfig } from './types';
import CategoryListPage from '../../Features/api-catalog/pages/CategoryListPage';
import HomePage from '../../Features/home/pages/HomePage';
import ApiDetailsPage from '../../Features/api-catalog/pages/ApiDetailsPage';

export const publicRoutes: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
    layout: true,
  },
  {
    path: ROUTES.CATEGORIES,
    element: <CategoryListPage />,
    layout: true,
  },
  {
    path: ROUTES.API_DETAILS,
    element: <ApiDetailsPage />,
    layout: true,
  },
  {
    path: ROUTES.AUTH.LOGIN,
    element: <div>Login Page (Coming Soon)</div>,
    layout: false,
  },
  {
    path: ROUTES.AUTH.REGISTER,
    element: <div>Register Page (Coming Soon)</div>,
    layout: false,
  },
  {
    path: ROUTES.AUTH.FORGOT_PASSWORD,
    element: <div>Forgot Password Page (Coming Soon)</div>,
    layout: false,
  },
]; 