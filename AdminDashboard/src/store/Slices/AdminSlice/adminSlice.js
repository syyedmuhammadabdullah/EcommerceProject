import { createSlice } from "@reduxjs/toolkit";
import {createAdmin,loginAdmin,logoutAdmin, updateAdmin,getAdmin} from "../../../index"
const initialState = {
    loading: false,
    error: null,
    admin: {},
    isAuthenticated: false,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.Admin = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(createAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            }).
            addCase(loginAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.Admin = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(updateAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(logoutAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutAdmin.fulfilled, (state) => {
                state.loading = false;
                state.admin = {};
                state.isAuthenticated = false;
            })
            .addCase(logoutAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default adminSlice.reducer;