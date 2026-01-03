import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateWithdrawRequest = createAsyncThunk(
    "transaction/updateWithdrawRequest",
    async ({id,status},{rejectWithValue})=>{
        try {
            const {data}=await axios.post(`http://localhost:3001/api/v1/transactions/updateWithdrawRequest/`,{
                status,
                transcationId:id
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
export default updateWithdrawRequest