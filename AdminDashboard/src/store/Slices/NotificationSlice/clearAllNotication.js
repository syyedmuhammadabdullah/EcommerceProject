import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const clearAllNotifications = createAsyncThunk(
    "notifications/clearAll",
    async (adminId, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/v1/notifications/clearAll/${adminId}/Admin`,{}, {
                    withCredentials: true,
            });
            
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);