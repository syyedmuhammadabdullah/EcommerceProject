import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateShippingStatus = createAsyncThunk(
    "order/updateShippingStatus",
    async ({orderId,shippingStatus},{rejectWithValue})=>{
        try {
            console.log(orderId);
            
            const {data}=await axios.post(`http://localhost:3001/api/v1/orders/updateShippingStatus`,{
                orderId,
                shippingStatus
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
export default updateShippingStatus