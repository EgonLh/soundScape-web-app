import {createAppSlice} from "@/lib/createAppSlice";
import {PayloadAction} from "@reduxjs/toolkit";
import {AuthResponse} from "@/lib/features/auth/authApi";
import jwt from "jsonwebtoken";
const initialState: AuthResponse = {
    TOKEN:'',
};

export const authSlice = createAppSlice({
    name: "auth",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: (create) => ({
        login: create.reducer((state,action: PayloadAction<AuthResponse>) => {
            state.TOKEN = action.payload.TOKEN;
        }),
        logout:create.reducer((state) => {
            state.TOKEN = '';
        }),



    }),
    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {
        selectAuth: (state) => state.TOKEN,
        selectUsrID:(state)=>(jwt.decode(state.TOKEN))?.id,
    },
});
export const { login,logout } = authSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectAuth,selectUsrID } = authSlice.selectors;