import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL_DOMAIN, API_WAIT_TIMEOUT } from '@/utils/constants';


const rawBaseQueryWithToken = fetchBaseQuery({
  baseUrl: API_URL_DOMAIN,
  timeout: API_WAIT_TIMEOUT,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const rawBaseQueryWithoutToken = fetchBaseQuery({
  baseUrl: API_URL_DOMAIN,
  timeout: API_WAIT_TIMEOUT,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    return headers;
  },
});

export const baseQueryWithToken = async (args, api, extraOptions) => {
  const result = await rawBaseQueryWithToken(args, api, extraOptions);

  if (result?.error?.status === 401) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_mobile');
    window.location.href = '/login';
  }

  return result;
};

export const baseQueryWithoutToken = async (args, api, extraOptions) => {
  const result = await rawBaseQueryWithoutToken(args, api, extraOptions);
  return result;
};

export const baseQueryWithInterceptor = baseQueryWithToken;
