/**
 * store.ts
 *
 * Sets up the Redux store with RTK Query and custom slices.
 *
 * ---
 * ## Description:
 * This file defines and exports the central Redux store configuration.
 * It integrates the extended RTK Query API (`extendedCarRentalApi`) and the custom `auth` slice.
 *
 * ---
 * ## Key Components:
 *
 * ### 1. `configureStore`
 * - Creates the Redux store using Redux Toolkit's `configureStore`.
 * - Automatically sets up Redux DevTools and sane middleware defaults.
 *
 * ### 2. Reducers
 * - `extendedCarRentalApi.reducer`: handles caching, data fetching, and invalidation for API endpoints.
 * - `authReducer`: manages authentication state (like storing the JWT token).
 *
 * ### 3. Middleware
 * - Includes default middleware (like `serializableCheck`, `thunk`).
 * - Adds `extendedCarRentalApi.middleware` to enable RTK Query functionality (e.g., auto refetching, cache).
 *
 * ---
 * ## Type Exports:
 *
 * ```ts
 * export type RootState = ReturnType<typeof store.getState>;
 * export type AppDispatch = typeof store.dispatch;
 * ```
 * - `RootState`: inferred type of the full Redux state tree.
 * - `AppDispatch`: typed dispatch for dispatching actions and thunks.
 *
 * These are typically used in hooks:
 * ```ts
 * const dispatch: AppDispatch = useDispatch();
 * const state: RootState = useSelector((state) => state);
 * ```
 *
 * ---
 * ## Notes:
 * - Make sure to include `<Provider store={store}>` at the root of your React app (e.g., `_app.tsx`).
 * - Extend the store easily by adding new slices or APIs under `reducer` and `middleware`.
 */

import { configureStore } from "@reduxjs/toolkit";
import { extendedCarRentalApi } from "./enhanceEndpoints";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    [extendedCarRentalApi.reducerPath]: extendedCarRentalApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(extendedCarRentalApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
