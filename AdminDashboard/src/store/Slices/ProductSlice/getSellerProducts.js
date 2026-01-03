import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getSellerProducts=createAsyncThunk(
    "product/getSellerProducts",
    async ({page,limit,sellerId}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/products/getSellerProducts",
                {
                    params: {sellerId,
                        page,
                    limit},
                    withCredentials: true,
                }
            );
            
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)
export default getSellerProducts