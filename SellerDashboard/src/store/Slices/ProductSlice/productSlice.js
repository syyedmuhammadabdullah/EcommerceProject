import {createSlice} from "@reduxjs/toolkit";
import  createProduct  from "./createProduct";
const initialState={
    loading:false,
    error:null,
    product:{},
    products:[]
}
const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createProduct.fulfilled,(state,action)=>{
            state.product=action.payload
        })
    }
})
export default productSlice