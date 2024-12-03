import { createSlice } from "@reduxjs/toolkit";
import { getUserProductReview,addProductReview, updateProductReview, getProductReviews } from "../../../index";
const initialState = {
    loading: false,
    error: null,
    userProductReviews: [],
    productReviews: []
}
const productReviewSlice = createSlice({
    name: "productReview",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProductReviews.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getProductReviews.fulfilled, (state, action) => {
            state.loading = false;
            state.productReviews = action.payload;
        })
        .addCase(getProductReviews.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
            .addCase(getUserProductReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProductReview.fulfilled, (state, action) => {
                state.loading = false;
                state.userProductReviews = action.payload;
            })
            .addCase(getUserProductReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addProductReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductReview.fulfilled, (state, action) => {
                state.loading = false;
                state.productReviews =[...state.productReviews,action.payload];
            })
            .addCase(addProductReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateProductReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductReview.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateProductReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // .addCase(getProductReviews.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(getProductReviews.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.productReviews = action.payload;
            // })
            // .addCase(getProductReviews.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.error.message;
            // })
    }
});
export default productReviewSlice.reducer