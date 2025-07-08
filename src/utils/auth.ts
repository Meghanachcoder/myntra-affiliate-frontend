export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('auth_token');
  return !!token;
};

export const isAdmin = (): boolean => {
  const userDetails = localStorage.getItem('user_details');
  if (!userDetails) return false;
  
  try {
    const user = JSON.parse(userDetails);
    return user.role === 'admin';
  } catch {
    return false;
  }
};

export const isAffiliate = (): boolean => {
  const userDetails = localStorage.getItem('user_details');
  if (!userDetails) return false;
  
  try {
    const user = JSON.parse(userDetails);
    return user.kyc ? true : false;
  } catch {
    return false;
  }
};

export const getUserDetails = () => {
  const userDetails = localStorage.getItem('user_details');
  if (!userDetails) return null;
  
  try {
    return JSON.parse(userDetails);
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_details');
};

export const setAuth = (token: string, userDetails: any) => {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user_details', JSON.stringify(userDetails));
}; 