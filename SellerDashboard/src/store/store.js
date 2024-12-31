import {configureStore} from '@reduxjs/toolkit'
import { productFormReducer,sellerReducer,productReducer,productQuestionReducer,customerReducer,orderReducer } from '../index'
const store=configureStore({
    reducer:{
        productForm:productFormReducer,
        seller:sellerReducer,
        product:productReducer,
        productsQuestion:productQuestionReducer,
        customer:customerReducer,
        order:orderReducer
    }
})

export default store