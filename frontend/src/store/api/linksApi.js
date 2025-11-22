import { baseApi } from './baseApi';

export const linksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create new link
    createLink: builder.mutation({
      query: (data) => ({
        url: '/links',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Link'],
    }),

    // Get all links
    getAllLinks: builder.query({
      query: () => '/links',
      providesTags: ['Link'],
    }),

    // Get links by authenticated user
    getLinksByUser: builder.query({
      query: () => '/links/user/me',
      providesTags: ['Link'],
    }),

    // Get single link stats
    getLinkStats: builder.query({
      query: (code) => `/links/${code}`,
      providesTags: (result, error, code) => [{ type: 'Link', id: code }],
    }),

    // Delete link
    deleteLink: builder.mutation({
      query: (code) => ({
        url: `/links/${code}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Link'],
    }),
  }),
});

export const {
  useCreateLinkMutation,
  useGetAllLinksQuery,
  useGetLinksByUserQuery,
  useGetLinkStatsQuery,
  useDeleteLinkMutation,
} = linksApi;
