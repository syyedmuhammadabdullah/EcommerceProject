import {createSlice} from "@reduxjs/toolkit";
import {createProduct,getAllProducts,updateProduct,deleteProduct} from "../../../index"
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

        builder.
        addCase(createProduct.pending,(state)=>{
            state.loading=true;
            state.error=null
        }).
        addCase(createProduct.fulfilled,(state,action)=>{
            state.products=[action.payload,...state.products]
        }).
        addCase(createProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        }).
        addCase(getAllProducts.pending,(state)=>{
            state.loading=true;
            state.error=null
        }).
        addCase(getAllProducts.fulfilled,(state,action)=>{
            state.products=action.payload
        }). 
        addCase(getAllProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        }).
        addCase(updateProduct.pending,(state)=>{
            state.loading=true;
            state.error=null
        }).
        addCase(updateProduct.fulfilled,(state,action)=>{
            state.products=[action.payload,...state.products]
        }). 
        addCase(updateProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        }).
        addCase(deleteProduct.pending,(state)=>{
            state.loading=true;
            state.error=null
        }).
        addCase(deleteProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=state.products.filter((product)=>product._id!==action.payload._id)
        }).
        addCase(deleteProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })

    }
})
export default productSlice.reducer