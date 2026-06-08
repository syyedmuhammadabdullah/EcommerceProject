import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const cancelProducts=createAsyncThunk(
    "order/cancelProducts",
    async({orderId,items},{rejectWithValue})=>{
        try {
            const {data}=await axios.post(`http://localhost:3001/api/v1/orders/cancelProducts`,{orderId,items},{
                withCredentials:true
            })
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export default cancelProducts