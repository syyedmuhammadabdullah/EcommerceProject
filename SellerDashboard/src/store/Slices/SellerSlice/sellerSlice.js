import { createSlice } from "@reduxjs/toolkit";
import {createSeller,loginSeller, updateSeller} from "../../../index"
const initialState = {
    loading: false,
    error: null,
    seller: {},
};

const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSeller.fulfilled, (state, action) => {
                state.loading = false;
                state.seller = action.payload;
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
            })
            .addCase(updateSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default sellerSlice.reducer;