import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '../utils/constants';
import { ROLES } from '../utils/constants';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: readonly string[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={user?.role === ROLES.ADMIN ? ROUTES.DASHBOARD : ROUTES.HOME_PAGE} replace />;
  }

  return <>{children}</>;
}