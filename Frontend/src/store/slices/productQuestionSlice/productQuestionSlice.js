import {createSlice} from "@reduxjs/toolkit";
import {createProductQuestion,deleteProductQuestion,updateProductQuestion,updateAnswerToProductQuestion,getProductQuestion} from "../../../index"

const initialState={
    loading:false,
    error:null,
    productQuestions:[]
}
const productQuestionSlice=createSlice({
    name:"productQuestion",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createProductQuestion.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(createProductQuestion.fulfilled,(state,action)=>{
            state.loading=false,
            state.productQuestions=action.payload
        })
        .addCase(createProductQuestion.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
        .addCase(getProductQuestion.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(getProductQuestion.fulfilled,(state,action)=>{
            state.loading=false,
            state.productQuestions=action.payload
        })
        .addCase(getProductQuestion.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
        .addCase(updateProductQuestion.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(updateProductQuestion.fulfilled,(state,action)=>{
            state.loading=false,
            state.productQuestions=action.payload
        })
        .addCase(updateProductQuestion.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
        .addCase(updateAnswerToProductQuestion.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(updateAnswerToProductQuestion.fulfilled,(state,action)=>{
            state.loading=false,
            state.productQuestions=action.payload
        })
        .addCase(updateAnswerToProductQuestion.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
        .addCase(deleteProductQuestion.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(deleteProductQuestion.fulfilled,(state,action)=>{
            state.loading=false,
            state.productQuestions=action.payload
        })
        .addCase(deleteProductQuestion.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
    }

})
export default productQuestionSlice.reducer