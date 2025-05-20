// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { carRentalApi } from "./carRentalApi"; // <- pataisyk kelią jei kitoks

export const store = configureStore({
  reducer: {
    [carRentalApi.reducerPath]: carRentalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carRentalApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
