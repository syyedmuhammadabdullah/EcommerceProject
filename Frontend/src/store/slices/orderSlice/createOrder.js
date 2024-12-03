import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const createOrder = createAsyncThunk(
    "order/createOrder",
    async (credentials, { rejectWithValue }) => {
        console.log(credentials);
        
        try {
            const { data } = await axios.post(
                "http://localhost:3001/api/v1/orders/createOrder",
                credentials,
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
export default createOrder;