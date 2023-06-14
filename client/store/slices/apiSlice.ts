import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Auth } from "../../types/auth"
import { List } from "../../types/list"
import { Rating } from "../../types/rating"
import { TvShow } from "../../types/tvShow"
import { User } from "../../types/user"
import { Review } from "../../types/review"
import { Progress } from "../../types/progress"
import { Genre } from "../../types/genre"

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
    tagTypes: ['api', 'Rating'],
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
        getMe: builder.mutation<User, Object>({
            query: (details) => {   
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                return {
                    url: '/auth/profile',
                    //   credentials: 'include',
                    body: details,
                    headers: headers,
                    method: "post",
                };
            },
        }),
        rate: builder.mutation<Object, Object>({
            query: (details) => {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
                }

                return {
                    url: '/ratings',
                    method: "post",
                    statusCode: 200,
                    headers: headers,
                    body: details,
                };
            }
        }),
        review: builder.mutation<Object, Object>({
            query: (details) => {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
                }

                return {
                    url: '/reviews',
                    method: "post",
                    statusCode: 200,
                    headers: headers,
                    body: details,
                };
            }
        }),
        changeRate: builder.mutation<Object, {details: Object, id: number}>({
            query: (args) => {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
                }

                const { details, id } = args;

                return {
                    url: '/ratings/'+id,
                    method: "put",
                    statusCode: 200,
                    headers: headers,
                    body: details,
                };
            }
        }),
        deleteRate: builder.mutation<Object, number>({
            query: (id: number) => {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
                }
                return {
                    url: '/ratings/'+id,
                    method: "delete",
                    statusCode: 200,
                    headers: headers,
                };
            }
        }),
        ratingOfShowByUser: builder.mutation<Object, { user: number, show: number }>({
            query: (args) => {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
                }

                const { user, show } = args;

                return {
                    url: '/ratings/user/'+user+'/show/'+show,
                    method: "get",
                    headers: headers,
                    params: { user, show }
                };
            }
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
            },
            providesTags: ['Rating'],
        }),
        getRatingOfShowByUserMut: builder.mutation<Rating, { user: number, show: number }>({
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
        getReviewsOfShow: builder.query<Review, number>({
            query(id: number) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                return {
                    url: '/reviews/tv-show/'+id,
                    method: "get",
                    headers: headers,
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
        getListById: builder.mutation<List, number>({
            query(id: number) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                return {
                    url: '/lists/'+id,
                    method: "get",
                    headers: headers,
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
        getSeasonsByShow: builder.query<Array<Object>, number>({
            query(id: number) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                return {
                    url: '/seasons/tvshow/'+id,
                    method: "get",
                    headers: headers
                }
            }
        }),
        getListsByUser: builder.mutation<Array<Object>, number>({
            query(id: number) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                return {
                    url: '/lists/user/'+id,
                    method: "get",
                    headers: headers
                }
            }
        }),
        getEpsBySeason: builder.query<Array<Object>, number>({
            query(id: number) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                return {
                    url: '/episodes/season/'+id,
                    method: "get",
                    headers: headers
                }
            }
        }),
        getCountEpsByShow: builder.query<Array<Object>, number>({
            query(id: number) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                return {
                    url: '/episodes/show/'+id,
                    method: "get",
                    headers: headers
                }
            }
        }),
        search: builder.mutation<Array<Object>, string>({
            query: (name: string) => {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                return {
                    url: '/tv-shows/search/query?name='+name,
                    method: "get",
                    headers: headers
                }
            }
        }),
        searchShows: builder.mutation<Array<Object>, string>({
            query: (name: string) => {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                return {
                    url: '/tv-shows/search-shows/query?name='+name,
                    method: "get",
                    headers: headers
                }
            }
        }),
        createProgress: builder.mutation<Progress, Object>({
            query(details) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                console.log(details);
                

                return {
                    url: '/progress',
                    method: "post",
                    headers: headers,
                    body: details
                }
            }
        }),
        createList: builder.mutation<List, Object>({
            query(details) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                console.log(details);
                

                return {
                    url: '/lists',
                    method: "post",
                    headers: headers,
                    body: details
                }
            }
        }),
        deleteShow: builder.mutation<Object, number>({
            query: (id: number) => {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
                }
                return {
                    url: '/tv-shows/'+id,
                    method: "delete",
                    statusCode: 200,
                    headers: headers,
                };
            }
        }),
        getGenres: builder.query({
            query: () => '/genres',
        }),
        editShow: builder.mutation<Object, { id: number, details: Object }>({
            query: (args) => {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
                }
                const { id, details } = args

                return {
                    url: '/tv-shows/'+id,
                    method: "put",
                    statusCode: 200,
                    headers: headers,
                    body: details
                };
            }
        }),
        editList: builder.mutation<Object, { id: number, details: Object }>({
            query: (args) => {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
                }
                const { id, details } = args
                console.log(typeof id);
                

                return {
                    url: '/lists/'+id,
                    method: "put",
                    statusCode: 200,
                    headers: headers,
                    body: details
                };
            }
        }),
        deleteList: builder.mutation<Object, number>({
            query: (id: number) => {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
                }
                return {
                    url: '/lists/'+id,
                    method: "delete",
                    statusCode: 200,
                    headers: headers,
                };
            }
        }),
        findShowProgressByUserByShow: builder.mutation<Array<Object>, { user: number, show: number }>({
            query: (args) => {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                const { user, show } = args

                return {
                    url: '/progress/user/'+user+"/show/"+show,
                    method: "get",
                    headers: headers
                }
            }
        }),
        getCastById: builder.query<Cast, number>({
            query(id: number) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
                }

                return {
                    url: '/cast/'+id,
                    method: "get",
                    headers: headers,
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
    useGetMeMutation,
    useGetAdminListsQuery,
    useGetShowByIdQuery,
    useGetMeanRatingByShowQuery,
    useGetRatingOfShowByUserQuery,
    useGetNumSeasonsByShowQuery,
    useGetCastByShowQuery,
    useGetCrewByShowQuery,
    useGetSeasonsByShowQuery,
    useGetEpsBySeasonQuery,
    useRateMutation,
    useChangeRateMutation,
    useGetReviewsOfShowQuery,
    useRatingOfShowByUserMutation,
    useReviewMutation,
    useGetListsByUserMutation,
    useGetListByIdMutation,
    useSearchMutation,
    useDeleteRateMutation,
    useGetRatingOfShowByUserMutMutation,
    useCreateProgressMutation,
    useSearchShowsMutation,
    useCreateListMutation,
    useDeleteShowMutation,
    useGetGenresQuery,
    useEditShowMutation,
    useEditListMutation,
    useDeleteListMutation,
    useFindShowProgressByUserByShowMutation,
    useGetCountEpsByShowQuery,
    useGetCastByIdQuery,
} = apiSlice