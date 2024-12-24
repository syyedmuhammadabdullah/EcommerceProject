import { createSlice } from "@reduxjs/toolkit";
import {createSeller} from "../../../index"
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
            });
    }
});

export default sellerSlice.reducer;