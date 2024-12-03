import {createSlice} from "@reduxjs/toolkit"
import {createStripePayment,confirmStripePayment} from "../../../index"
const initialState={
    loading:false,
    error:null,
    paymentStatus:null,
    paymentIntentId:null,
    StripePayment:null,
    RazorPayPayment:null,
    PaytmPayment:null,
    walletPayment:null,
}

const paymentSlice=createSlice({
    name:"payment",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createStripePayment.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(createStripePayment.fulfilled,(state,action)=>{
            state.paymentIntentId=action.payload.id,
            state.loading=false
        })
        .addCase(createStripePayment.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
        .addCase(confirmStripePayment.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(confirmStripePayment.fulfilled,(state,action)=>{
            state.loading=false,
            state.paymentStatus=action.payload
        })
        .addCase(confirmStripePayment.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
    }
})
export default paymentSlice.reducer
