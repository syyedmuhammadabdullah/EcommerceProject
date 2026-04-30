import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getNotifications = createAsyncThunk(
    "notification/getNotifications",
    async ({sellerId, page = 1, limit = 20}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `http://localhost:3001/api/v1/notifications/getNotifications/${sellerId}/Seller`,
                {
                    params: {
                        page,
                        limit,
                    },
                    withCredentials: true,
                }
            );
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getNotifications;