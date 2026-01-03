import { createSlice } from "@reduxjs/toolkit";
import getAllSellers from "./getAllSellers";

const initialState = {
    loading: true,
    error: null,
    seller: {},
    sellers:[],
    isAuthenticated: false,
};

const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllSellers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllSellers.fulfilled, (state, action) => {
                state.loading = false;
                state.sellers = action.payload;
            })
            .addCase(getAllSellers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }    
    
});

export default sellerSlice.reducer;