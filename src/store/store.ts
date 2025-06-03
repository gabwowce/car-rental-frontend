// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { extendedCarRentalApi } from "./enhanceEndpoints";

export const store = configureStore({
  reducer: {
    [extendedCarRentalApi.reducerPath]: extendedCarRentalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(extendedCarRentalApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
