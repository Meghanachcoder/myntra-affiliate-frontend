import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithInterceptor } from './baseQueryWithInterceptor';

export type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: string;
  referenceNumber?: string | null;
};

export const invoiceApi = createApi({
  reducerPath: 'invoiceApi',
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getInvoices: builder.query<Invoice[], string>({
      query: (mobile) => `dashboard/${mobile}/invoices`,
    }),

    // You can use mutation for triggering a download
    downloadInvoice: builder.mutation<Blob, string>({
      query: (invoiceId) => ({
        url: `invoice/${invoiceId}/download`,
        method: 'GET',
        responseHandler: async (response) => response.blob(), // handle binary
      }),
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useDownloadInvoiceMutation,
} = invoiceApi;
