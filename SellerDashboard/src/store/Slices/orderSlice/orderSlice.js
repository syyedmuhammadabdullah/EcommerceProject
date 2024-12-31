import { createSlice } from "@reduxjs/toolkit";
import {getSellerOrders,getOneSellerOrder} from "../../../index"
const initialState = {
    loading: false,
    error: null,
    orders: [],
    totalOrders: 0,
    order: {},
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getSellerOrders.pending, (state) => {
            state.loading = true;
        })
        .addCase(getSellerOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload.data;
            state.totalOrders = action.payload.totalOrders;
        })
        .addCase(getSellerOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getOneSellerOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getOneSellerOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
        })
        .addCase(getOneSellerOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }

});
export default orderSlice.reducer