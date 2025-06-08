// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { carRentalApi } from "./carRentalApi";

/**
 * Main Redux store configuration.
 *
 * - Adds the RTK Query reducer for `carRentalApi`
 * - Injects the API middleware for caching, polling, and invalidation
 */
export const store = configureStore({
  reducer: {
    // RTK Query reducer for carRentalApi
    [carRentalApi.reducerPath]: carRentalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carRentalApi.middleware),
});

/**
 * Root state type based on store's reducer.
 * Used in selectors and typed hooks.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * App dispatch type, used in typed dispatch hooks.
 */
export type AppDispatch = typeof store.dispatch;
