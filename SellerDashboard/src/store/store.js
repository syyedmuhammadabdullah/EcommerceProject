import {configureStore} from '@reduxjs/toolkit'
import { productFormReducer,transationReducer,sellerReducer,productReducer,productQuestionReducer,customerReducer,orderReducer } from '../index'
const store=configureStore({
    reducer:{
        productForm:productFormReducer,
        seller:sellerReducer,
        product:productReducer,
        productsQuestion:productQuestionReducer,
        customer:customerReducer,
        order:orderReducer,
        transaction:transationReducer
    }
})

export default store