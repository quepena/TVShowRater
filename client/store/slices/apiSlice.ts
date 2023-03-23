import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Auth } from "../../types/auth"
import { List } from "../../types/list"

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
    }),
    tagTypes: ['api'],
    endpoints: (builder) => ({
        getLists: builder.query<List, number>({
            query: (id: number) => '/lists/user/' + id,
        }),
        login: builder.mutation<Object, Auth>({
            query: (details) => {
                return {
                    url: '/auth/login',
                    body: details,
                    method: "post"
                };
            },
            // transformResponse: (response: { data: Auth }) => response.data,
            // transformErrorResponse: (
            //     response: { status: string | number },
            // ) => response.status,
        }),
    }),
})

export const { useGetListsQuery, useLoginMutation } = apiSlice