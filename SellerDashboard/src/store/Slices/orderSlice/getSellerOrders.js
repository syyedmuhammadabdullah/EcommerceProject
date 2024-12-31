import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getSellerOrders = createAsyncThunk(
    "order/getSellerOrders",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/orders/getSellerOrders",
                
                {
                    withCredentials: true,
                }
            );
            console.log(data);
            
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getSellerOrders