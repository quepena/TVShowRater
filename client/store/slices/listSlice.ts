import { AsyncThunkPayloadCreator, createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { HYDRATE } from 'next-redux-wrapper';
// import { AppThunkDispatch } from '../store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type ListState = {
    email: string;
    name: string;
    last_name: string;
    photo: string;
    password: string;
    isAdmin: boolean;
}

type ListsState = {
    status: "loading" | "idle";
    error: string | null;
    list: ListState[];
};

const initialState: ListsState = {
    list: [],
    error: null,
    status: "idle",
};

// export const listSlice = createSlice({
//     name: 'list',
//     initialState,
//     reducers: {
//     },

//     extraReducers: (builder) => {
//         builder.addCase(fetchLists.fulfilled,
//             (state, { payload }) => {
//                 state.list.push(...payload);
//                 state.status = "idle";
//             });
//     }
// });

export const fetchLists = createApi({
    reducerPath: 'listSlice',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:5000',
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
      getLists: builder.query({
        query: (id: number) => '/lists/user/'+id,
      }),
    }),
  })

// export const fetchLists = createAsyncThunk<ListState[]>(
//     "lists/fetch/user/:id",
//     async (id: number): Promise<ListState[]> {
//         const response = await fetch(
//             'http://localhost:5000/lists/fetch/user/' + id
//         );

//         const data = await response.json();
//         console.log(data);

//         return data;
//     },
// );

export const getListState = (state: { list: ListState }) => state.list;

export const { useGetListsQuery } = fetchLists

// export const { setName, setEmail, setLastName, setPhoto, setPassword, setIsAdmin, getUsers } = userSlice.actions;

// export default listSlice.reducer;