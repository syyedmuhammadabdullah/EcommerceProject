import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

const trackOrder=createAsyncThunk(
    "order/trackOrder",
    async({orderId},{rejectWithValue})=>{
        console.log("orderId",orderId);
        
        try {
            const {data}=await axios.get("http://localhost:3001/api/v1/orders/trackOrder",
                {
                    withCredentials: true,
                    params: {orderId},
                })
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export default trackOrder