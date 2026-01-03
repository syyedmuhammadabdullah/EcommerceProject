import { createSlice } from "@reduxjs/toolkit";
import {getAllOrders,getOneSellerOrder,getSellerOrdersDetail,getSellerOrders,getCustomerOrders} from "../../../index"
import updateOderStatus from "./updateOderStatus";
const initialState = {
    loading: false,
    error: null,
    orders: [],
    customerOrders: [],
    sellerWallet: 0,
    sellerOrders: [],
    sellerId: "",
    userId: "",
    totalOrders: 0,
    order: {},
    orderstats: {},
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllOrders.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload.data;
            state.totalOrders = action.payload.totalOrders;
        })
        .addCase(getAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getCustomerOrders.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCustomerOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.customerOrders = action.payload
        })
        .addCase(getCustomerOrders.rejected, (state, action) => {
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
        })
        .addCase(getSellerOrdersDetail.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getSellerOrdersDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.orderstats = action.payload?.chart;            
            state.sellerWallet = action.payload?.wallet?.balance
        })
        .addCase(getSellerOrdersDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateOderStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateOderStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
        })
        .addCase(updateOderStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getSellerOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getSellerOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.sellerOrders = action.payload
        })
        .addCase(getSellerOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }

});
export default orderSlice.reducer