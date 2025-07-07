import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithInterceptor } from './baseQueryWithInterceptor';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: (mobile: string) => `dashboard/${mobile}`,
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
