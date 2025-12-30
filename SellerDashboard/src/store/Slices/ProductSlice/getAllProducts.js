import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllProducts = createAsyncThunk(
    "product/getAllProducts",
    async ({filter=null,search="",page=1,limit=10}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/products/getAllSellerProducts",
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
            
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getAllProducts
