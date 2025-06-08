import { configureStore } from "@reduxjs/toolkit";
import { extendedCarRentalApi } from "./enhanceEndpoints";
import authReducer from "./authSlice";

/**
 * Configures the Redux store for the AutoRent system.
 *
 * Includes:
 * - `extendedCarRentalApi.reducer`: Handles all API-related caching and state
 * - `authReducer`: Manages JWT-based authentication
 * - Middleware: Enables RTK Query behavior (caching, auto-fetching)
 */
export const store = configureStore({
  reducer: {
    /** RTK Query API reducer for car rental endpoints */
    [extendedCarRentalApi.reducerPath]: extendedCarRentalApi.reducer,

    /** Custom reducer for authentication (JWT token state) */
    auth: authReducer,
  },

  /**
   * Middleware configuration:
   * - Adds default Redux middleware (e.g. thunk, serializableCheck)
   * - Appends RTK Query middleware for caching and revalidation
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(extendedCarRentalApi.middleware),
});

/**
 * RootState type inferred from the entire store's reducer structure.
 * Use with `useAppSelector` or `useSelector`.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * AppDispatch type inferred from store dispatch.
 * Use with `useAppDispatch` for fully-typed dispatching.
 */
export type AppDispatch = typeof store.dispatch;
