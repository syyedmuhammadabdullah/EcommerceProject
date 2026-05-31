import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getProductsQuestion = createAsyncThunk(
    "productQuestion/getProductsQuestion",
    async ({filter,search,page=1,limit=10}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/sellers/getSellerProductsQuestion",
                
                {
                    params: {
                        filter,
                        search,
                        page,
                        limit
                    },
                    withCredentials: true,
                }
            );
            
            return data
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getProductsQuestion