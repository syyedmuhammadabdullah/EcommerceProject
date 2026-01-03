import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getSellerOrders = createAsyncThunk(
    "seller/getSellerOrders",
    async ({page=1,limit=10,sellerId,search,filter}, { rejectWithValue }) => {
        try {
           
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/orders/getSellerAllOrders",
                
                {
                    params: {page,limit,sellerId,search,filter},
                    withCredentials: true,
                }
            );           
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getSellerOrders;