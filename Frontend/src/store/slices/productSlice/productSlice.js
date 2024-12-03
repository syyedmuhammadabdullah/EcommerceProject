import { createSlice } from "@reduxjs/toolkit";
import { getProductDetails,filterProduct} from "../../../index";
const initialState = {
    loading: false,
    error: null,
    products: [],
    product: {},
    productReviews: [],
    productQuestions: [],
    filteredProducts: [],
    searchProduct:"",
}
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSearchProduct: (state, action) => {
            state.searchProduct = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getProductDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        }).addCase(getProductDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(filterProduct.pending,(state)=>{
            state.loading=null,
            state.error=null
        })
        .addCase(filterProduct.fulfilled,(state,action)=>{
            state.loading=false,
            state.filteredProducts=action.payload
        })
        .addCase(filterProduct.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
    }
});
export const { setSearchProduct } = productSlice.actions
export default productSlice.reducer