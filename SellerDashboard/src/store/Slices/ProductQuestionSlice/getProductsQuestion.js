import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getProductsQuestion = createAsyncThunk(
    "productQuestion/getProductsQuestion",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/sellers/getSellerProductsQuestion",
                
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
export default getProductsQuestion