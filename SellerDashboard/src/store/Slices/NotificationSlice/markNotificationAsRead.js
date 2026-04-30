import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const markNotificationAsRead = createAsyncThunk(
    "notifications/markAsRead",
    async (notificationId, { rejectWithValue }) => {
        try {
            const {data} = await axios.post(`http://localhost:3001/api/v1/notifications/markAsRead/${notificationId}/Seller`,{}, {
                withCredentials: true,
            });
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
