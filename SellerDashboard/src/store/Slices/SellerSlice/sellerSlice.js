import { createSlice } from "@reduxjs/toolkit";
import {createSeller,loginSeller,logoutSeller, updateSeller,getSeller} from "../../../index"
const initialState = {
    loading: true,
    error: null,
    seller: {},
    isAuthenticated: false,
};

const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSeller.fulfilled, (state, action) => {
                state.loading = false;
                state.seller = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSeller.fulfilled, (state, action) => {
                state.loading = false;
                state.seller = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(createSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            }).
            addCase(loginSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginSeller.fulfilled, (state, action) => {
                state.loading = false;
                state.seller = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSeller.fulfilled, (state, action) => {
                state.loading = false;
                state.seller = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(updateSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(logoutSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutSeller.fulfilled, (state) => {
                state.loading = false;
                state.seller = {};
                state.isAuthenticated = false;
            })
            .addCase(logoutSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default sellerSlice.reducer;