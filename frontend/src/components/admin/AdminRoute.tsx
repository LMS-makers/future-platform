import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ROUTES, ROLES } from '../../utils/constants';

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!user || user.role !== ROLES.ADMIN) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}
