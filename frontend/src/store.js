import { configureStore } from "@reduxjs/toolkit"
import loginReducer from './slices/authSlice.js'

const store = configureStore({
    reducer: {
        login: loginReducer
    }
})

export default store