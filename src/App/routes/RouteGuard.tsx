import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from './constants';
import { useAuthStore } from '../../Shared/store/authStore';
import type { RouteGuardProps } from './types';

const RouteGuard = ({ route, children }: RouteGuardProps) => {
  const location = useLocation();
  const { isAuthenticated, hasAllPermissions } = useAuthStore();

  // Check if route requires authentication
  if (route.meta?.requiresAuth && !isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to={ROUTES.AUTH.LOGIN} state={{ from: location }} replace />;
  }

  // Check if user has required roles
  if (route.meta?.roles) {
    const userRoles = ['user']; // TODO: Replace with actual user roles
    const hasRequiredRole = route.meta.roles.some((role) => userRoles.includes(role));

    if (!hasRequiredRole) {
      return <Navigate to={ROUTES.HOME} replace />;
    }
  }

  // Check permissions
  if (route.meta?.permissions && !hasAllPermissions(route.meta?.permissions)) {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RouteGuard; 