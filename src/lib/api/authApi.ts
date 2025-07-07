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
  }),
});

export const {
  useSignupMutation,
  useVerifyOtpMutation,
  useLoginSendOtpMutation,
  useLoginVerifyOtpMutation,
  useSubmitKycMutation,
  useGetKycStatusQuery,
} = authApi;
