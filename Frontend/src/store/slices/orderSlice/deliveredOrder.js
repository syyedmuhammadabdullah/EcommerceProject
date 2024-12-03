import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deliveredOrder = createAsyncThunk(
    "order/deliveredOrder",
    async (Credential, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "http://localhost:3001/api/v1/orders/deliveredOrder",
                Credential,
                {
                    withCredentials: true,
                }
            );
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default deliveredOrder;
