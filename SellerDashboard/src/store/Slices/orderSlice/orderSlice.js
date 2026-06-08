import { createSlice } from "@reduxjs/toolkit";
import {getSellerOrders,processRefund,getOneSellerOrder,getSellerOrdersDetail,reviewProducts,updateShippingStatus,packProduct, handleRefundStatus} from "../../../index"
const initialState = {
    loading: false,
    error: null,
    orders: [],
    totalOrders: 0,
    order: {},
    orderstats: {},
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders.unshift(action.payload);
        },
        updateOrderInState: (state, action) => {
            const updatedOrder = action.payload;
            const index = state?.orders?.findIndex(order => order._id === updatedOrder._id);
            if (index !== -1) {
                state.orders[index] = updatedOrder;
            }
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getSellerOrders.pending, (state) => {
            state.loading = true;
        })
        .addCase(getSellerOrders.fulfilled, (state, action) => {            
            state.loading = false;
            state.orders = action.payload.data;
            state.totalOrders = action.payload.totalCount;
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
        })
        .addCase(getSellerOrdersDetail.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getSellerOrdersDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.orderstats = action.payload.chart;
        })
        .addCase(getSellerOrdersDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(reviewProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(reviewProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
        })
        .addCase(reviewProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateShippingStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateShippingStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
        })
        .addCase(updateShippingStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(packProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(packProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
        })
        .addCase(packProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(handleRefundStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(handleRefundStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.order = action.payload;
        })
        .addCase(handleRefundStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(processRefund.pending,(state)=>{
            state.loading=true,
            state.error=null    
        })
        .addCase(processRefund.fulfilled,(state,action)=>{
            state.loading=false,
            state.order=action?.payload
        })
        .addCase(processRefund.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
    }

});
export const { addOrder, updateOrderInState } = orderSlice.actions;
export default orderSlice.reducer