import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "revisit-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500/",
  }),
  endpoints: (builder) => ({}),
});
