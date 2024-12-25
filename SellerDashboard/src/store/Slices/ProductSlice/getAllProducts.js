import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllProducts = createAsyncThunk(
    "product/getAllProducts",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/products/getAllSellerProducts",
                
                {
                    withCredentials: true,
                }
            );
            console.log(data);
            
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getAllProducts
