import {createSlice } from "@reduxjs/toolkit";
import { getWishlist, removeItemFromWishlist } from "../../../index";
import addItemToWishlist from "./addItemToWishlist";
const initialState = {
    loading: false,
    error: null,
    wishlist: []
}
const wishlishSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        clearWishlist: (state) => {
            state.wishlist = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addItemToWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                console.log("wishlist add item",action.payload);
                
                state.wishlist = [...state.wishlist, action.payload];
            })
            .addCase(addItemToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeItemFromWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeItemFromWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(removeItemFromWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});
export const {clearWishlist} = wishlishSlice.actions
export default wishlishSlice.reducer;