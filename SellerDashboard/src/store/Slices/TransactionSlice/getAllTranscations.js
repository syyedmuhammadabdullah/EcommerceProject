import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

 const getAllTransactions = createAsyncThunk(
    "transaction/getAllTransactions",

    async ({type,page=1,limit=20,filter}, { rejectWithValue }) => {
        try {
            
            const response = await axios.get(`http://localhost:3001/api/v1/transactions/getAllTransactions`, {
                params: { type,page,limit,filter },
                withCredentials: true,
            });
            console.log(response);
            
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export default getAllTransactions;