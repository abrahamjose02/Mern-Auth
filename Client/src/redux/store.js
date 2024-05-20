import {configureStore} from '@reduxjs/toolkit'
import { userReducer } from './user/userSlice';  // name changed to userReducer since it is default export from store

export const store = configureStore({
    reducer:{user:userReducer},
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false,
    }),
});