import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllSellerCustomers = createAsyncThunk(
    "customer/getAllSellerCustomers",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/customers/getAllSellerCustomers",
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

export default getAllSellerCustomers;