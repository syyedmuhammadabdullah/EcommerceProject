import { createSlice } from "@reduxjs/toolkit";

import {logoutUser,loginUser,registerUser,authCheck, updateUserBasicInfo,updateUserAvatar} from "../../../index"
const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated:false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
        //authCheck
        .addCase(authCheck.pending,(state)=>{
            state.loading=true,
            state.isAuthenticated=false,
            state.error=null
        })
        .addCase(authCheck.fulfilled,(state,action)=>{
            state.loading=false,
            state.isAuthenticated=true,
            state.user=action.payload
        })
        .addCase(authCheck.rejected,(state,action)=>{
            state.loading=false,
            state.isAuthenticated=false,
            state.error=null
        })
                // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.isAuthenticated=false
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated=true
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated=false
                state.error = action.payload.response.data;
            })
            // Logout User
            .addCase(logoutUser.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.isAuthenticated=false;
            })
            .addCase(logoutUser.fulfilled,(state)=>{
                state.loading = false;
                state.user = null;
                state.isAuthenticated=false;
            })
            .addCase(logoutUser.rejected,(state,action)=>{
                state.loading = false;
                state.isAuthenticated=false
                state.error = action.payload.response.data;
            }) //Register User
            .addCase(registerUser.pending,(state)=>{
                state.loading = true;
                state.error = null;
                state.isAuthenticated=false;
            })
            .addCase(registerUser.fulfilled,(state,action)=>{
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated=true;
            })
            .addCase(registerUser.rejected,(state,action)=>{
                state.loading = false;
                state.isAuthenticated=false
                state.error = action.payload.response.data;
            })
            //update User Basic Info
            .addCase(updateUserBasicInfo.pending,(state)=>{
                state.loading=true,
                state.error=null    
            })
            .addCase(updateUserBasicInfo.fulfilled,(state,action)=>{
                state.loading=false,
                state.user=action.payload

            })
            .addCase(updateUserBasicInfo.rejected,(state,action)=>{
                state.loading=false,
                state.error=action.error.message    
            })
            //update User Avatar
            .addCase(updateUserAvatar.pending,(state)=>{
                state.loading=true,
                state.error=false
            })
            .addCase(updateUserAvatar.fulfilled,(state,action)=>{
                state.loading=false,
                state.error=false,
                state.user=action.payload
            })
            .addCase(updateUserAvatar.rejected,(state,action)=>{
                state.loading=false,
                state.error=action.error.message
            })

    },
});
export default authSlice.reducer