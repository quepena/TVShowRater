import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import { createWrapper } from 'next-redux-wrapper';

export const store = () => configureStore({
    reducer: {
        user: userSlice,
    },
    devTools: true,
});

export const wrapper = createWrapper(store);