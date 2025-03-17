import { createSlice } from '@reduxjs/toolkit';
import { encrypt } from 'utils/encrypt';

const initialState = {
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { token, id, ...rest } = action.payload;
            state.user = {
                token: encrypt(token),
                id: encrypt(id),
                ...rest
            };
        },
        setProfileData: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload
            };
        },
        
        logout: (state) => {
            state.user = null;
        },
        updateInfo: (state, action) => {
            const { firstName, lastName, gender, avatar } = action.payload;
            const data = {
                ...state.user,
                firstName,
                lastName,
                gender,
                avatar
            };
            state.user = data;
        },
       
    }
});

export const { login, logout, updateInfo, setProfileData } = authSlice.actions;
export default authSlice.reducer;
