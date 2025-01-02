import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    authenticated: false,
}

export const login = createAsyncThunk(
    'auth/login', async (formData) => {
        const response = await axios.post('http://localhost:8000/api/user/auth', formData, {
            withCredentials: true
        })

        return response.data
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser', async () => {
        const response = await axios.post('http://localhost:8000/api/user/logout',{}, {
            withCredentials: true
        })
        
        return response.data
    }
)

export const checkAuth = createAsyncThunk(
    'auth/checkAuth', async () => {
        const response = await axios.get('http://localhost:8000/api/user/check-auth', {
            withCredentials: true
        })
        
        return response.data
    }
)

const authSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: state => {
            state.user = null;
            state.authenticated = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(login.pending, state => {
            state.authenticated = false;
            state.user = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.authenticated = true;
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.authenticated = false;
            state.user = null;
        });
        
        builder.addCase(logoutUser.pending, state => {
            state.authenticated = false;
            state.user = null;
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.authenticated = false;
            state.user = action.payload;
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.authenticated = false;
            state.user = null;
        });
        
        builder.addCase(checkAuth.pending, state => {
            state.authenticated = false;
            state.user = null;
        });
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.authenticated = true;
            state.user = action.payload;
            console.log(action.payload);
            
        });
        builder.addCase(checkAuth.rejected, (state, action) => {
            state.authenticated = false;
            state.user = null;
        });
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer