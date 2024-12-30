import {configureStore} from '@reduxjs/toolkit'
import { productFormReducer,sellerReducer,productReducer,productQuestionReducer,customerReducer } from '../index'
const store=configureStore({
    reducer:{
        productForm:productFormReducer,
        seller:sellerReducer,
        product:productReducer,
        productsQuestion:productQuestionReducer,
        customer:customerReducer
    }
})

export default store