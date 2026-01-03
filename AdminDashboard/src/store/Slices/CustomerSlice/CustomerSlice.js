import {createSlice} from "@reduxjs/toolkit";
import {getAllCustomers} from "../../../index"

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
        builder.addCase(getAllCustomers.pending,(state)=>{
            state.loading=true,
            state.error=null
        }).
        addCase(getAllCustomers.fulfilled,(state,action)=>{
            state.loading=false
            state.customers=action.payload.data,
            state.totalCustomers=action.payload.totalCount
        }).
        addCase(getAllCustomers.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    }
})

export default customerSlice.reducer