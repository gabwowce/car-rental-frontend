import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/** @typedef {import('./store').RootState} RootState */

/**
 * Reusable base API configuration using RTK Query.
 *
 * Handles token injection, cookie-based authentication, and default headers.
 */
export const baseApi = createApi({
  /** Key used in Redux store for this API slice */
  reducerPath: 'api',

  /**
   * Base query configuration for all API requests.
   * - Sets base URL
   * - Injects JWT token if present
   * - Enables cookie support
   * - Adds `Accept: application/json` header
   */
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials: 'include', // Include cookies in every request

    /**
     * Automatically prepare headers for each request.
     *
     * @param {Headers} headers - The outgoing request headers
     * @param {Object} context - Context object containing `getState`
     * @returns {Headers} Modified headers with token and Accept type
     */
    prepareHeaders: (headers, { getState }) => {
      /** @type {RootState} */
      const state = getState();

      // Prefer Redux state token; fallback to localStorage
      const token =
        state.auth?.token ??
        (typeof window !== 'undefined'
          ? localStorage.getItem('accessToken')
          : null);

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      headers.set('Accept', 'application/json');
      return headers;
    },
  }),

  /**
   * Empty endpoint list. Extend via `injectEndpoints` from other modules.
   */
  endpoints: () => ({}),
});
