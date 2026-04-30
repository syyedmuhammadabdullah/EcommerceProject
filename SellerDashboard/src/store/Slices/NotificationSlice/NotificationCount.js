import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getNotificationCount = createAsyncThunk(
    "notification/getNotificationCount",
    async (sellerId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `http://localhost:3001/api/v1/notifications/getNotificationCount/${sellerId}/Seller`,
                {
                    withCredentials: true,
                }
            );
            
            return data.data.count;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getNotificationCount;