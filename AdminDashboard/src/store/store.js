import {configureStore} from '@reduxjs/toolkit'
import { transationReducer,adminReducer,categoryReducer,sellerReducer,productReducer,productQuestionReducer,customerReducer,orderReducer, notificationReducer } from '../index'
const store=configureStore({
    reducer:{
        seller:sellerReducer,
        admin:adminReducer,
        product:productReducer,
        productsQuestion:productQuestionReducer,
        customer:customerReducer,
        order:orderReducer,
        category:categoryReducer,
        transaction:transationReducer,
        notifications:notificationReducer,
    }
})

export default store