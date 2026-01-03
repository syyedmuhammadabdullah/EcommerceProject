import {configureStore} from '@reduxjs/toolkit'
import { transationReducer,adminReducer,sellerReducer,productReducer,productQuestionReducer,customerReducer,orderReducer } from '../index'
const store=configureStore({
    reducer:{
        seller:sellerReducer,
        admin:adminReducer,
        product:productReducer,
        productsQuestion:productQuestionReducer,
        customer:customerReducer,
        order:orderReducer,
        transaction:transationReducer
    }
})

export default store