import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const markAllNotificationAsRead = createAsyncThunk(
    "notifications/markAllAsRead",
    async (adminId, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/v1/notifications/markAllAsRead/${adminId}/Admin`,{}, {
                    withCredentials: true,
            });
            
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);