import {createSlice} from "@reduxjs/toolkit";
import {getAllSellerCustomers} from "../../../index"

const initialState={
    loading:false,
    error:null,
    totalCustomers:0,
    customers:[]
}
const customerSlice=createSlice({
    name:"customer",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllSellerCustomers.pending,(state)=>{
            state.loading=true,
            state.error=null
        }).
        addCase(getAllSellerCustomers.fulfilled,(state,action)=>{
            state.loading=false
            state.customers=action.payload.data,
            state.totalCustomers=action.payload.totalCount
        }).
        addCase(getAllSellerCustomers.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    }
})

export default customerSlice.reducer