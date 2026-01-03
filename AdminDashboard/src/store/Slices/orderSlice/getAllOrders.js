import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getAllOrders = createAsyncThunk(
    "order/getAllOrders",
    async ({filter=null,search="",page=1,limit=10,sellerId}, { rejectWithValue }) => {
    const filterData={
        filter,
        search,
        page,
        limit,
        sellerId
    }
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/orders/getAllOrders",
                
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
export default getAllOrders