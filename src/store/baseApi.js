// src/store/baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/** @typedef {import('./store').RootState} RootState */

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      /** @type {RootState} */
      const state = getState();
      const token =
        state.auth?.token ??
        (typeof window !== 'undefined'
          ? localStorage.getItem('accessToken')
          : null);

      if (token) headers.set('Authorization', `Bearer ${token}`);
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: () => ({}),
});
