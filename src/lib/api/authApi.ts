import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth',
  }),
  endpoints: (builder) => ({
    //Signup
    signup: builder.mutation({
      query: (body: { affiliateId: string; mobile: string }) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body: { mobile: string; otp: string | number }) => ({
        url: '/verify-otp',
        method: 'POST',
        body,
      }),
    }),

    // Login
    loginSendOtp: builder.mutation({
      query: (mobile: string) => ({
        url: '/login/send-otp',
        method: 'POST',
        body: { mobile },
      }),
    }),
    loginVerifyOtp: builder.mutation({
      query: (body: { mobile: string; otp: string | number }) => ({
        url: '/login/verify-otp',
        method: 'POST',
        body,
      }),
    }),
    submitKyc: builder.mutation({
  query: (body) => ({
    url: '/kyc/submit',
    method: 'POST',
    body,
    headers: {
      authorization: `Bearer ${localStorage.getItem('auth_token')}`, // if using token from login
    },
  }),
}),
getKycStatus: builder.query({
  query: () => ({
    url: '/kyc/status',
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('auth_token')|| ''}`,
    },
  }),
}),

  }),
});

export const {
  useSignupMutation,
  useVerifyOtpMutation,
  useLoginSendOtpMutation,
  useLoginVerifyOtpMutation,
  useSubmitKycMutation,
  useGetKycStatusQuery
} = authApi;
