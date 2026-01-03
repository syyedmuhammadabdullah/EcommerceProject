import { createSlice } from "@reduxjs/toolkit";
import { getProductsQuestion, giveAnswerToQuestion } from "../../../index";
const initialState = {
    loading: false,
    error: null,
    productsQuestion: [],
};

const productQuestionSlice = createSlice({
    name: "productQuestion",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsQuestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductsQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.productsQuestion = action.payload;
            })
            .addCase(getProductsQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(giveAnswerToQuestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(giveAnswerToQuestion.fulfilled, (state, action) => {
                state.loading = false;
                console.log("action.payload", action.payload);
                state.productsQuestion = [action.payload, ...state.productsQuestion.filter((question) => question._id !== action.payload._id)];
            })
            .addCase(giveAnswerToQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default productQuestionSlice.reducer;