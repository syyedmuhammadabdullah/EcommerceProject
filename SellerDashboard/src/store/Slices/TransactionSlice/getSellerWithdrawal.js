import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const getSellerWithdrawal=createAsyncThunk(
    "transaction/getSellerWithdrawal",
    async ({page=1,limit=10,filter="all"}, { rejectWithValue }) => {
        try {
            
            const response = await axios.get(`http://localhost:3001/api/v1/transactions/getSellerWithdrawal`, {
                params: { page,limit,filter },
                withCredentials: true,
            });
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
export default getSellerWithdrawal