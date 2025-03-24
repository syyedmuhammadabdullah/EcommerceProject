import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getSeller = createAsyncThunk(
    "seller/getSeller",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/sellers/getSeller",
                {
                    withCredentials: true,
                }
            );
            
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getSeller;