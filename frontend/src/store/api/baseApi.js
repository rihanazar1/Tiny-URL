import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: [
    "Auth",
    "Link",
  ],
  endpoints: () => ({}),
});