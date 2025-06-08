/**
 * baseApi.js
 *
 * Sets up a reusable RTK Query base API configuration for making HTTP requests
 * with automatic token injection and cookie support.
 *
 * ---
 * ## Description:
 * This file creates a `baseApi` instance using `createApi` from RTK Query.
 * It defines a `baseQuery` using `fetchBaseQuery` to:
 * - Set the base URL for all API requests
 * - Automatically include the JWT token from Redux state or localStorage
 * - Include cookies (e.g., refresh tokens) in requests
 * - Set the `Accept: application/json` header
 *
 * ---
 * ## Typing:
 * Uses `RootState` (imported via JSDoc typedef) to access the global Redux state.
 *
 * ```ts
 * @typedef {import('./store').RootState} RootState
 * ```
 *
 * ---
 * ## Token Handling:
 * - Priority is given to `state.auth.token` from Redux.
 * - If not available, it checks `localStorage` for `accessToken` (useful on first load).
 * - If a token is found, it sets the `Authorization` header using Bearer schema.
 *
 * ---
 * ## Cookie Support:
 * - The `credentials: 'include'` option ensures cookies are sent with requests.
 *   Useful for session management and refresh token flows.
 *
 * ---
 * ## Example:
 * ```ts
 * export const myApi = baseApi.injectEndpoints({
 *   endpoints: (builder) => ({
 *     getUser: builder.query({ ... }),
 *     login: builder.mutation({ ... }),
 *   }),
 * });
 * ```
 *
 * ---
 * ## Notes:
 * - The `endpoints` function is left empty here and should be extended using
 *   `injectEndpoints` in other files (modular design).
 * - Can be shared across multiple API modules.
 */

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
