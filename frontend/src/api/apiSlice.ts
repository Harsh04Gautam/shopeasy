import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["User", "Products"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500/api/v1",
    credentials: "include",
  }),
  endpoints: (_builder) => ({}),
});
