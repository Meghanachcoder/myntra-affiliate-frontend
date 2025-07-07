import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithInterceptor } from './baseQueryWithInterceptor';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body,
      }),
    }),
    loginSendOtp: builder.mutation({
      query: (mobile) => ({
        url: '/auth/login/send-otp',
        method: 'POST',
        body: { mobile },
      }),
    }),
    loginVerifyOtp: builder.mutation({
      query: (body) => ({
        url: '/auth/login/verify-otp',
        method: 'POST',
        body,
      }),
    }),
    submitKyc: builder.mutation({
      query: (body) => ({
        url: '/auth/kyc/submit',
        method: 'POST',
        body,
      }),
    }),
    getKycStatus: builder.query({
      query: () => ({
        url: '/auth/kyc/status',
        method: 'GET',
      }),
    }),
    adminLogin: builder.mutation<any, string>({
      query: (mobile) => ({
        url: '/api/admin/login',
        method: 'POST',
        body: { mobile },
      }),
    }),
    adminLoginVerifyOtp: builder.mutation({
  query: (body) => ({
    url: '/api/admin/login-verify-otp',
    method: 'POST',
    body,
  }),
}), 
getAllAffiliates: builder.query({
  query: ({ page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'ASC', search = '' }) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sortBy,
      sortOrder,
    });
    if (search) params.append('search', search);

    return {
      url: `/api/admin/affiliates?${params.toString()}`,
      method: 'GET',
    };
  },
}),
  }),
});

export const {
  useSignupMutation,
  useVerifyOtpMutation,
  useLoginSendOtpMutation,
  useLoginVerifyOtpMutation,
  useSubmitKycMutation,
  useGetKycStatusQuery,
  useAdminLoginMutation,
  useAdminLoginVerifyOtpMutation,
  useGetAllAffiliatesQuery
} = authApi;
