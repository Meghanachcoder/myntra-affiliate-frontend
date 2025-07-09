import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { logHelper } from '@/utils/utils';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  requireAffiliate?: boolean;
  isKYCRequired?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireAdmin = false,
  requireAffiliate = false,
  isKYCRequired = false,
  redirectTo = '/login'
}) => {
  
  const { isAuthenticated, isAdmin, isAffiliate, isLoading, isKYCCompleted } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-myntra-purple mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // logHelper(' =======> isAuthenticated ', isAuthenticated);
  // logHelper(' =======> isAdmin ', isAdmin);
  // logHelper(' =======> isAffiliate ', isAffiliate);
  // logHelper(' =======> isKYCCompleted ', isKYCCompleted);

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requireAffiliate && !isAffiliate) {
    return <Navigate to="/login" replace />;
  }

  if (isKYCRequired && !isKYCCompleted) {
    return <Navigate to="/kyc" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 