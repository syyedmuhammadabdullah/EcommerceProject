import { createSlice } from "@reduxjs/toolkit";
import {createMainCategory,updateMainCategory,deleteMainCategory,getMainCategories,getSubCategories,createSubCategory,updateSubCategory,deleteSubCategory} from "../../../index"

const initialState = {
    loading: false,
    error: null,
    mainCategories: [],
    subCategories: [],
    totalCategories: 0,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.
        addCase(createMainCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).
        addCase(createMainCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.mainCategories = [action.payload, ...state.mainCategories];
            state.totalCategories = state.totalCategories + 1;
        }).
        addCase(createMainCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }).
        addCase(updateMainCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).
        addCase(updateMainCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.mainCategories = state.mainCategories.map((category) => {
                if (category._id === action.payload._id) {
                    return action.payload;
                }
                return category;
            });
        }).
        addCase(updateMainCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }).
        addCase(deleteMainCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).
        addCase(deleteMainCategory.fulfilled, (state, action) => {
            state.loading = false;            
            state.mainCategories = state.mainCategories.filter(
                (category) => category._id !== action.payload._id
            );
            state.totalCategories = state.totalCategories - 1;
        }).
        addCase(deleteMainCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }).
        addCase(getMainCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).
        addCase(getMainCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.mainCategories = action.payload;
            // state.totalCategories = action.payload.totalCategories;
        }).
        addCase(getMainCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }).
        addCase(getSubCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).
        addCase(getSubCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.subCategories = action.payload;
            // state.totalCategories = action.payload.totalCategories;
        }).
        addCase(getSubCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }).
        addCase(createSubCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).
        addCase(createSubCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.subCategories = [action.payload, ...state.subCategories];
            state.totalCategories = state.totalCategories + 1;
        }).
        addCase(createSubCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }).
        addCase(updateSubCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).
        addCase(updateSubCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.subCategories = state.subCategories.map((category) => {
                if (category._id === action.payload._id) {
                    return action.payload;
                }
                return category;
            });
        }).
        addCase(updateSubCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }).
        addCase(deleteSubCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).
        addCase(deleteSubCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.subCategories = state.subCategories.filter(
                (category) => category._id !== action.payload._id
            );
            state.totalCategories = state.totalCategories - 1;
        }).
        addCase(deleteSubCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
       
       
    },
});

export default categorySlice.reducer;