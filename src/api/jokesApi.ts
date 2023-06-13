import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { IJoke, IPage, updateJokes } from '@/pages/jokes/jokeSlice';
import { standardizeResponceKeys } from '@/utils/formatters';

export const jokeApi = createApi({
  reducerPath: 'jokeApi',
  baseQuery: customFetchBase,
  tagTypes: ['Jokes'],
  endpoints: (builder) => ({
    addJoke: builder.mutation<{}, FormData>({
      query(data) {
        return {
          url: '/jokes',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Jokes'],
    }),
    getJokes: builder.query<IJoke[], IPage>({
      query({ page, limit, order, order_field }) {
        return {
          url: `/jokes/?_page=${page}&_limit=${limit}&_sort=${order_field}&_order=${order}`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result?.map(({ id }: any) => ({
                type: 'Jokes' as const,
                id,
              })),
              { type: 'Jokes', id: 'Jokes_LIST' },
            ]
          : [{ type: 'Jokes', id: 'Jokes_LIST' }],
      transformResponse: (results: any) => results,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(updateJokes({ jokes: standardizeResponceKeys(data) }));
        } catch (error) {}
      },
    }),
    getJoke: builder.query<IJoke, string>({
      query(id) {
        return {
          url: `/jokes/${id}`,
        };
      },
    }),
    editJoke: builder.mutation<{}, { id: string | any; data: IJoke }>({
      query({ id, data }) {
        return {
          url: `/jokes/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['Jokes'],
    }),
    deleteJoke: builder.mutation<{}, { id: number }>({
      query(id) {
        return {
          url: `/jokes/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Jokes'],
    }),
  }),
});

export const {
  useAddJokeMutation,
  useLazyGetJokesQuery,
  useLazyGetJokeQuery,
  useEditJokeMutation,
  useDeleteJokeMutation,
} = jokeApi;
