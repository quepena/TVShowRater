// import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { HYDRATE } from 'next-redux-wrapper';

// export type UserState = {
//     email: string;
//     name: string;
//     last_name: string;
//     photo: string;
//     password: string;
//     isAdmin: boolean;
// }

// type UsersState = {
//     status: "loading" | "idle";
//     error: string | null;
//     list: UserState[];
// };

// const initialState: UsersState = {
//     list: [],
//     error: null,
//     status: "idle",
// };

// export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         // setName: (
//         //     state: Draft<typeof initialState>,
//         //     action: PayloadAction<typeof initialState.name>
//         // ) => {
//         //     state.name = action.payload;
//         // },
//         // setLastName: (
//         //     state: Draft<typeof initialState>,
//         //     action: PayloadAction<typeof initialState.last_name>
//         // ) => {
//         //     state.last_name = action.payload;
//         // },
//         // setEmail: (
//         //     state: Draft<typeof initialState>,
//         //     action: PayloadAction<typeof initialState.email>
//         // ) => {
//         //     state.email = action.payload;
//         // },
//         // setPhoto: (
//         //     state: Draft<typeof initialState>,
//         //     action: PayloadAction<typeof initialState.photo>
//         // ) => {
//         //     state.photo = action.payload;
//         // },
//         // setPassword: (
//         //     state: Draft<typeof initialState>,
//         //     action: PayloadAction<typeof initialState.password>
//         // ) => {
//         //     state.password = action.payload;
//         // },
//         // setIsAdmin: (
//         //     state: Draft<typeof initialState>,
//         //     action: PayloadAction<typeof initialState.isAdmin>
//         // ) => {
//         //     state.isAdmin = action.payload;
//         // },
//         // getUsers: (
//         //     state: Draft<typeof initialState>,
//         //     action: PayloadAction<typeof initialState.isAdmin>
//         // ) => {
//         //     state.name, state.last_name, state.email, state.photo, state.password, state.isAdmin = action.payload;
//         // },
//     },

//     extraReducers: (builder) => {
//         builder.addCase(fetchUsers.fulfilled,
//             (state, { payload }) => {
//                 state.list.push(...payload);
//                 state.status = "idle";
//             });
//     }
// });

// export const fetchUsers = createAsyncThunk<UserState[]>(
//     "users/fetch",
//     async () => {
//         const response = await fetch(
//             `http://localhost:5000/users/`
//         );

//         const data = await response.json();
//         console.log(data);

//         return data;
//     }
// );

// export const getUserState = (state: { user: UserState }) => state.user;

// // export const { setName, setEmail, setLastName, setPhoto, setPassword, setIsAdmin, getUsers } = userSlice.actions;

// export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';

interface IUserState {
  user: User | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;