import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
const filterProduct=createAsyncThunk(
    "product/filterProduct",
    async(filter,{rejectWithValue})=>{
        try {
            const {data}=await axios.get("http://localhost:3001/api/v1/products/productFilter",{
                withCredentials:true,
                params:filter
            })
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export default filterProduct