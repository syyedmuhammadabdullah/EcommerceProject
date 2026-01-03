import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getCustomerOrders = createAsyncThunk(
    "order/getCustomerOrders",
    async ({filter,limit,page,userId,search=""}, { rejectWithValue }) => {
        try {
            
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/orders/getCustomerOrders",
                {
                    params: { filter,limit,page,userId,search },
                    withCredentials: true,
                }
            );
            
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getCustomerOrders