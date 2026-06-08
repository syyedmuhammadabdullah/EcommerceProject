import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const updateItemStatus = createAsyncThunk(
    "order/updateItemStatus",
    async ({orderId,items,status},{rejectWithValue})=>{
        try {
            console.log(orderId,items,status);
            
            const {data}=await axios.post(`http://localhost:3001/api/v1/orders/updateItemStatus/${orderId}`,{
                items,
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