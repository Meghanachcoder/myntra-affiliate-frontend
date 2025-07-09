import { useState, useEffect } from 'react';
import { isAuthenticated, isAdmin, isAffiliate, getUserDetails, isKYCCompleted } from '@/utils/auth';

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAffiliate: boolean;
  user: any;
  isLoading: boolean;
  isKYCCompleted: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    isAffiliate: false,
    user: null,
    isLoading: true,
    isKYCCompleted: false
  });

  useEffect(() => {
    const checkAuth = () => {
      try {
        const authenticated = isAuthenticated();
        const admin = isAdmin();
        const affiliate = isAffiliate();
        const user = getUserDetails();
        const kycCompleted = isKYCCompleted();

        setAuthState({
          isAuthenticated: authenticated,
          isAdmin: admin,
          isAffiliate: affiliate,
          user,
          isLoading: false,
          isKYCCompleted: kycCompleted
        });
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthState({
          isAuthenticated: false,
          isAdmin: false,
          isAffiliate: false,
          user: null,
          isLoading: false,
          isKYCCompleted: false
        });
      }
    };

    checkAuth();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token' || e.key === 'user_details') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_details');
    setAuthState({
      isAuthenticated: false,
      isAdmin: false,
      isAffiliate: false,
      user: null,
      isLoading: false,
      isKYCCompleted: false
    });
  };

  return {
    ...authState,
    logout,
  };
}; 