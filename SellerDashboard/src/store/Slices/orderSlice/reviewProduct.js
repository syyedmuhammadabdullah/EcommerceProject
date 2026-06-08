import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const reviewProducts=createAsyncThunk(
    "order/reviewProducts",
    async ({orderId,items,action},{rejectWithValue})=>{
        try {
            console.log(orderId,items);
            
            const {data}=await axios.post(`http://localhost:3001/api/v1/orders/reviewProducts`,{
               
                items, action, orderId
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
export default reviewProducts