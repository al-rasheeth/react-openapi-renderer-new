import { ROUTES } from './constants';
import type { RouteConfig } from './types';
import { Container, Typography } from '@mui/material';
import ApiCategoryList from '../../Features/api-catalog/components/ApiCategoryList/ApiCategoryList';

const HomePage = () => (
  <Container>
    <Typography variant="h4" component="h1" gutterBottom>
      Welcome to API Documentation
    </Typography>
    <Typography variant="body1">
      Explore our comprehensive API documentation and tools.
    </Typography>
  </Container>
);

export const publicRoutes: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
    layout: true,
  },
  {
    path: ROUTES.CATEGORIES,
    element: <ApiCategoryList />,
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