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
        login: builder.mutation<Object, Object>({
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
        // login: builder.mutation<
        //     { access_token: string; status: string },
        //     LoginInput
        // >({
        //     query(data) {
        //         return {
        //             url: 'login',
        //             method: 'POST',
        //             body: data,
        //             credentials: 'include',
        //         };
        //     },
        //     async onQueryStarted(args, { dispatch, queryFulfilled }) {
        //         try {
        //             await queryFulfilled;
        //             await dispatch(userApi.endpoints.getMe.initiate(null));
        //         } catch (error) { }
        //     },
        // }),
        // verifyEmail: builder.mutation<
        //     IGenericResponse,
        //     { verificationCode: string }
        // >({
        //     query({ verificationCode }) {
        //         return {
        //             url: `verifyemail/${verificationCode}`,
        //             method: 'GET',
        //         };
        //     },
        // }),
        // logoutUser: builder.mutation<void, void>({
        //     query() {
        //         return {
        //             url: 'logout',
        //             credentials: 'include',
        //         };
        //     },
        // }),
    }),
})

export const { useGetListsQuery, useLoginMutation } = apiSlice