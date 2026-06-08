import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const requestOrderRefund=createAsyncThunk(
    "order/requestOrderRefund",
    async({orderId},{rejectWithValue})=>{
        try {
            const {data}=await axios.post(`http://localhost:3001/api/v1/orders/requestOrderRefund`,{orderId},{
                withCredentials:true
            })
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export default requestOrderRefund