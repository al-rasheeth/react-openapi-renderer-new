import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from './constants';
import { useAuthStore } from '../../Shared/store/authStore';
import type { RouteConfig } from './types';

interface RouteGuardProps {
  children: ReactNode;
  route: RouteConfig;
}

const RouteGuard = ({ children, route }: RouteGuardProps) => {
  const location = useLocation();
  const { isAuthenticated, hasAllPermissions, hasAnyPermission, hasRole } = useAuthStore();

  // Check authentication
  if (route.auth && !isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.LOGIN} state={{ from: location }} replace />;
  }

  // Check permissions
  if (route.permissions && !hasAllPermissions(route.permissions)) {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />;
  }

  // Check roles
  if (route.roles && !route.roles.some(hasRole)) {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RouteGuard; 