import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { protectedRoutes } from './protectedRoutes';
import RouteGuard from './RouteGuard';
import AppLayout from '../../Shared/components/layout/AppLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <RouteGuard route={route}>
              {route.layout ? <AppLayout>{route.element}</AppLayout> : route.element}
            </RouteGuard>
          }
        />
      ))}
      {protectedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <RouteGuard route={route}>
              {route.layout ? <AppLayout>{route.element}</AppLayout> : route.element}
            </RouteGuard>
          }
        />
      ))}
    </Routes>
  );
};

export default AppRoutes; 