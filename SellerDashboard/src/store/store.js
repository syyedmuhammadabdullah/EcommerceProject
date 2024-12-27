import {configureStore} from '@reduxjs/toolkit'
import { productFormReducer,sellerReducer,productReducer,productQuestionReducer } from '../index'
const store=configureStore({
    reducer:{
        productForm:productFormReducer,
        seller:sellerReducer,
        product:productReducer,
        productsQuestion:productQuestionReducer
    }
})

export default store