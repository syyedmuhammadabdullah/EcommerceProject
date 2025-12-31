import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getSellerOrdersDetail = createAsyncThunk(
    "order/getSellerOrdersDetail",
    async ({range}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/orders/getSellerOrdersDetail",
                {
                    params: { range },
                    withCredentials: true,
                }
            );
            
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getSellerOrdersDetail