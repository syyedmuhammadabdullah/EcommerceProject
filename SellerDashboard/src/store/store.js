import {configureStore} from '@reduxjs/toolkit'
import { productFormReducer,sellerSlice } from '../index'
const store=configureStore({
    reducer:{
        productForm:productFormReducer,
        seller:sellerSlice,
    }
})

export default store