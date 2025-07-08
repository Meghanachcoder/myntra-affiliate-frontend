import { configureStore } from '@reduxjs/toolkit';

import { dashboardApi } from './api/dashboardApi';
import { invoiceApi } from './api/invoiceApi';
import { adminApi } from './api/adminApi'

export const store = configureStore({
  reducer: {
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [invoiceApi.reducerPath]: invoiceApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(dashboardApi.middleware)
      .concat(invoiceApi.middleware)
      .concat(adminApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
