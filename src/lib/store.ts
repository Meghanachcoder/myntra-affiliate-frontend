import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/authApi';
import { dashboardApi } from './api/dashboardApi';
import { invoiceApi } from './api/invoiceApi';
import { adminApi } from './api/adminApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [invoiceApi.reducerPath]: invoiceApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(invoiceApi.middleware)
      .concat(adminApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
