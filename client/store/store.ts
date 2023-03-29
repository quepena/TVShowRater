import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
// import userSlice from './slices/userSlice';
import { createWrapper } from 'next-redux-wrapper';
// import listSlice from './slices/listSlice';
import { useDispatch } from 'react-redux';
import { fetchLists } from './slices/listSlice';
import { apiSlice } from './slices/apiSlice';
import { userSlice } from './slices/userSlice';

export const store = () => configureStore({
    reducer: {
        // user: userSlice,
        // list: listSlice,
        // [fetchLists.reducerPath]: fetchLists.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        // user: userSlice.reducer,
    },
    devTools: true,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    middleware:
        (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

// export type RootState = ReturnType<typeof listSlice>;

// export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

// export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

export const wrapper = createWrapper(store);