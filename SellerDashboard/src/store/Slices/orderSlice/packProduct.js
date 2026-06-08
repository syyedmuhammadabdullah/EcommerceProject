import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const packProduct = createAsyncThunk(
    "order/packProduct",
    async ({orderId},{rejectWithValue})=>{
        try {
            console.log(orderId);
            
            const {data}=await axios.post(`http://localhost:3001/api/v1/orders/packProducts`,{
                orderId,
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
export default packProduct