import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userInfo: localStorage.getItem('jwt')
        ? JSON.parse(localStorage.getItem('jwt'))
        : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem('jwt', JSON.stringify(action.payload))
            logout: (state, action) => {
                state.userInfo = null
                localStorage.removeItem('jwt')
            }
        }
    }
})

export const { setCredentials, logout } = authSlice.actions 
export default authSlice.reducer