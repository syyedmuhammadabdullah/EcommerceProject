import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllSellerCustomers = createAsyncThunk(
    "customer/getAllSellerCustomers",
    async ({search="",page=1,limit=10}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/customers/getAllSellerCustomers",
                {
                    params: {
                        search,
                        page,
                        limit
                    },
                    withCredentials: true,
                }
            );
            
            return data;
        } catch (error) {
    
            return rejectWithValue(error);
        }
    }
);

export default getAllSellerCustomers;