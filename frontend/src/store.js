import { configureStore } from "@reduxjs/toolkit"; 
import AuthReducer from './slices/authSlice'


const store = configureStore({
    reducer: {
        auth: AuthReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
})

export default store