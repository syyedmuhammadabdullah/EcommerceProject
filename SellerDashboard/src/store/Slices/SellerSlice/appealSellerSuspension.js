import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const appealSellerSuspension = createAsyncThunk(
    "seller/appealSellerSuspension",
    async (reason, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:3001/api/v1/sellers/appealSellerSuspension",
                { reason },
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);