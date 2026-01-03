import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

 const getTransactions = createAsyncThunk(
    "transaction/getTransactions",

    async (_, { rejectWithValue }) => {
        try {
            
            const response = await axios.get("http://localhost:3001/api/v1/transactions/getTransactions", {
                withCredentials: true,
            });
            return response.data.data[0];
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export default getTransactions;