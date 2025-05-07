import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import likedPlaceReducer from './likedSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        liked: likedPlaceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;