import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getNotifications = createAsyncThunk(
    "notification/getNotifications",
    async ({adminId, page = 1, limit = 20}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `http://localhost:3001/api/v1/notifications/getNotifications/${adminId}/Admin`,
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