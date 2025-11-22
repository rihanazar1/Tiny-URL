import { baseApi } from './baseApi';

export const linksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLink: builder.mutation({
      query: (data) => ({
        url: '/api/links',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Link'],
    }),

    getAllLinks: builder.query({
      query: () => '/api/links',
      providesTags: ['Link'],
    }),

    getLinkStats: builder.query({
      query: (code) => `/api/links/${code}`,
      providesTags: (result, error, code) => [{ type: 'Link', id: code }],
    }),

    deleteLink: builder.mutation({
      query: (code) => ({
        url: `/api/links/${code}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Link'],
    }),
  }),
});

export const {
  useCreateLinkMutation,
  useGetAllLinksQuery,
  useGetLinkStatsQuery,
  useDeleteLinkMutation,
} = linksApi;
