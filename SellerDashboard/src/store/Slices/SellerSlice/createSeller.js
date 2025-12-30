import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createSeller = createAsyncThunk(
    "seller/createSeller",
    async ({ sellerForm }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "http://localhost:3001/api/v1/sellers/createSeller",
                sellerForm,
                {
                    withCredentials: true,
                }
            );            
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export default createSeller;