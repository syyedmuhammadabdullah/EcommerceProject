import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getOneSellerOrder=createAsyncThunk(
    "order/getOneSellerOrder",
    async(orderId,{rejectWithValue})=>{
            console.log("orderId",orderId);
        
        try {
            const {data}=await axios.get("http://localhost:3001/api/v1/orders/getOneSellerOrder",{
                withCredentials:true,
                params:{orderId}
            })
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export default getOneSellerOrder