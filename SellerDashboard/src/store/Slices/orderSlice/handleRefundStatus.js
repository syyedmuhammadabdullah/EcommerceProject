import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const handleRefundStatus = createAsyncThunk(
    "order/handleRefundStatus",
    async ({orderId,refundStatus,items},{rejectWithValue})=>{
        try {
            const {data}=await axios.post(`http://localhost:3001/api/v1/orders/handleRefundStatus`,{
                orderId,
                refundStatus,
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
export default handleRefundStatus