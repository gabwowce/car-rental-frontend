import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000", // arba kur tavo API veikia
    credentials: "include", // <-- Svarbiausia dalis
  }),
  endpoints: () => ({}),
});
