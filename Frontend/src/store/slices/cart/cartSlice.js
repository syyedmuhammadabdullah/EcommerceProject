import { createSlice } from "@reduxjs/toolkit";
import { addItemToCart, getUserCart,removeItemFromCart,updateCartItem } from "../../../index";

const initialState = {
    cartItems: [],
    loading: false,
    error: null
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart(state){
            state.cartItems=null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
          
            .addCase(addItemToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateCartItem.pending,(state)=>{
                state.loading=false;
                state.error=null
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeItemFromCart.pending,(state)=>{
                state.loading=true;
                state.error=null
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;
            })
            .addCase(removeItemFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});
export const {clearCart}=cartSlice.actions
export default cartSlice.reducer