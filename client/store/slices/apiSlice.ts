import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Auth } from "../../types/auth"
import { List } from "../../types/list"
import { Rating } from "../../types/rating"
import { TvShow } from "../../types/tvShow"
import { User } from "../../types/user"

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        mode: "cors",
        prepareHeaders: (headers) => {
            headers.set('Access-Control-Allow-Origin', '*')
            headers.set(
                "Access-Control-Allow-Methods",
                "OPTIONS, GET, POST, PUT, PATCH, DELETE"
            )
            headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
            return headers
        }
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
        }),
        register: builder.mutation<Object, Object>({
            query: (details) => {
                return {
                    url: '/auth/register',
                    body: details,
                    method: "post"
                };
            },
        }),
        google: builder.mutation<Object, Object>({
            query: (details) => {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
                }

                return {
                    url: '/google',
                    method: "post",
                    statusCode: 200,
                    headers: headers,
                    body: details,
                };
            }
        }),
        getMe: builder.query<User, null>({
            query(details) {
                return {
                    url: '/auth/profile',
                    //   credentials: 'include',
                    body: details
                };
            },
        }),
        getAdminLists: builder.query<TvShow, string>({
            query(name: string) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                return {
                    url: '/lists/name/'+name,
                    method: "get",
                    headers: headers,
                }
            }
        }),
        getShowById: builder.query<TvShow, number>({
            query(id: number) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                return {
                    url: '/tv-shows/'+id,
                    method: "get",
                    headers: headers,
                }
            }
        }),
        getMeanRatingByShow: builder.query<number, number>({
            query(id: number) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                return {
                    url: '/ratings/tv-show/'+id+'/rate',
                    method: "get",
                    headers: headers,
                }
            }
        }),
        getRatingOfShowByUser: builder.query<Rating, { user: number, show: number }>({
            query(args) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                const { user, show } = args

                return {
                    url: '/ratings/user/'+user+'/show/'+show,
                    method: "get",
                    headers: headers,
                    params: { user, show }
                }
            }
        }),
        getNumSeasonsByShow: builder.query<Array<Object>, number>({
            query(id: number) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                return {
                    url: '/seasons/tvshow/count/'+id,
                    method: "get",
                    headers: headers
                }
            }
        }),
        getCastByShow: builder.query<Array<Object>, number>({
            query(id: number) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                return {
                    url: '/cast/show/actors/'+id,
                    method: "get",
                    headers: headers
                }
            }
        }),
        getCrewByShow: builder.query<Array<Object>, number>({
            query(id: number) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                return {
                    url: '/cast/show/crew/'+id,
                    method: "get",
                    headers: headers
                }
            }
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

export const {
    useGetListsQuery,
    useLoginMutation,
    useRegisterMutation,
    useGoogleMutation,
    useGetMeQuery,
    useGetAdminListsQuery,
    useGetShowByIdQuery,
    useGetMeanRatingByShowQuery,
    useGetRatingOfShowByUserQuery,
    useGetNumSeasonsByShowQuery,
    useGetCastByShowQuery,
    useGetCrewByShowQuery,
} = apiSlice