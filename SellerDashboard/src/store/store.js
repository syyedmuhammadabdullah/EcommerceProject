import {configureStore} from '@reduxjs/toolkit'
import { productFormReducer,sellerReducer,productReducer } from '../index'
const store=configureStore({
    reducer:{
        productForm:productFormReducer,
        seller:sellerReducer,
        product:productReducer
    }
})

export default store