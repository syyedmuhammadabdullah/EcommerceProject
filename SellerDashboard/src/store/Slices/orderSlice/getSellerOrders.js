import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getSellerOrders = createAsyncThunk(
    "order/getSellerOrders",
    async ({filter=null,search="",page=1,limit=10}, { rejectWithValue }) => {
    const filterData={
        filter,
        search,
        page,
        limit
    }
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/orders/getSellerOrders",
                
                {
                    withCredentials: true,
                    params:filterData
                }
            );
            
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getSellerOrders