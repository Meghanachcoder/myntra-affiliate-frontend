import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axiosInstance from '@/api/axiosInstance';

export const adminApi = createApi({
  reducerPath: 'affiliateApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Affiliate'],
  endpoints: (builder) => ({
    getAffiliateById: builder.query({
      query: (id: string) => `/admin/affiliates/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Affiliate', id }],
    }),
    updateKycStatus: builder.mutation<void, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/admin/affiliates/${id}/kyc`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Affiliate', id }],
    }),
  }),
});

export const {
  useGetAffiliateByIdQuery,
  useUpdateKycStatusMutation,
} = adminApi;
