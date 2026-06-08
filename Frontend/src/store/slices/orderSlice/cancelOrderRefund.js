import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const cancelOrderRefund=createAsyncThunk(
    "order/cancelOrderRefund",
    async({orderId},{rejectWithValue})=>{
        try {
            const {data}=await axios.post(`http://localhost:3001/api/v1/orders/cancelOrderRefund`,{orderId},{
                withCredentials:true
            })
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export default cancelOrderRefund