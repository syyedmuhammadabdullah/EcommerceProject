import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getOrders = createAsyncThunk(
    "order/getOrders",
    async ({page=1,limit=10}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/orders/getOrders",
                {
                    params: { page, limit },
                    withCredentials: true,
                }
            );            
            
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getOrders;