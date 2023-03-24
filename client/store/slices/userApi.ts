import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/user';
import { setUser } from './userSlice';

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5000/`,
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getMe: builder.query<User, null>({
            query(details) {
                return {
                    url: '/auth/profile',
                    //   credentials: 'include',
                    body: details
                };
            },
            transformResponse: (result: { data: { user: User } }) =>
                result.data.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) { }
            },
        }),
    }),
});