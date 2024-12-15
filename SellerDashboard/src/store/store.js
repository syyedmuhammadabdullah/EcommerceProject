import {configureStore} from '@reduxjs/toolkit'
import productFormReducer from '../store/productForm/productForm'
const store=configureStore({
    reducer:{
        productForm:productFormReducer
    }
})

export default store