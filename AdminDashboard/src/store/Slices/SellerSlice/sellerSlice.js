import { createSlice } from "@reduxjs/toolkit";
import getAllSellers from "./getAllSellers";
import updateSellerStatus from "./updateSellerStatus";
import getSellerDetailForAdmin from "./getSellerDetailForAdmin";
import getSeller from "./getSeller";
const initialState = {
    loading: true,
    error: null,
    seller: {},
    sellerStats:{},
    sellers:[],
    totalSellers:0,
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
                state.sellers = action.payload.data;
                state.totalSellers = action.payload.total;
            })
            .addCase(getAllSellers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            }).
            addCase(updateSellerStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSellerStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.seller = action.payload;
                state.sellers = state.sellers.map((seller) => {
                    if (seller._id === action.payload._id) {
                        return action.payload;
                    }
                    return seller;
                })
            })
            .addCase(updateSellerStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            }).
            addCase(getSellerDetailForAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSellerDetailForAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.sellerStats = action.payload;
            })
            .addCase(getSellerDetailForAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            }).
            addCase(getSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSeller.fulfilled, (state, action) => {
                state.loading = false;
                state.seller = action.payload;
            })
            .addCase(getSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default sellerSlice.reducer;