import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getProductsQuestion = createAsyncThunk(
    "productQuestion/getProductsQuestion",
    async ({filter,search,page,limit}, { rejectWithValue }) => {
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
            
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getProductsQuestion