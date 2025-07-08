import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const RootRedirect: React.FC = () => {

  const { isAuthenticated, isAdmin, isAffiliate, isLoading } = useAuth();

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

  if (isAuthenticated) {
    if (isAdmin) {
      return <Navigate to="/admin" replace />;
    } else if (isAffiliate) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <Navigate to="/signup?affiliateId=AFF321" replace />;
};

export default RootRedirect; 