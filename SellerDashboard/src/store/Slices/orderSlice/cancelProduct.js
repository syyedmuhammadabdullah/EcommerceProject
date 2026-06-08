import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const cancelProduct = createAsyncThunk(
    "order/cancelProduct",
    async ({orderId,items},{rejectWithValue})=>{
        try {
            console.log(orderId);
            
            const {data}=await axios.post(`http://localhost:3001/api/v1/orders/cancelProduct`,{
                orderId,
                items
            },
            {
                withCredentials:true
            })
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export default cancelProduct