import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const clearAllNotifications = createAsyncThunk(
    "notifications/clearAll",
    async (sellerId, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/v1/notifications/clearAll/${sellerId}/Seller`,{}, {
                    withCredentials: true,
            });
            
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);