import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import type { ReactNode } from 'react';

interface AdminRouteProps {
  children: ReactNode;
}

function AdminRoute({ children }: AdminRouteProps) {
  const { user, isAdmin } = useContext(AuthContext);
  return user && isAdmin ? children : <Navigate to="/" />;
}

export default AdminRoute;
