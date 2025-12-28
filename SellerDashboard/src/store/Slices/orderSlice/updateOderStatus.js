import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const updateOderStatus=createAsyncThunk(
    "order/updateOderStatus",
    async ({orderId,status},{rejectWithValue})=>{
        try {
            const {data}=await axios.post(`http://localhost:3001/api/v1/orders/updateOrder/${orderId}`,{
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
export default updateOderStatus