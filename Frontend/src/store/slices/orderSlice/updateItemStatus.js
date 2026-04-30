import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const updateItemStatus = createAsyncThunk(
    "order/updateItemStatus",
    async ({orderId,itemId,status},{rejectWithValue})=>{
        try {
            console.log(orderId,itemId,status);
            
            const {data}=await axios.post(`http://localhost:3001/api/v1/orders/updateItemStatus/${orderId}/${itemId}`,{
                status
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
export default updateItemStatus