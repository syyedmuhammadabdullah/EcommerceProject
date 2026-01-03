import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({productId,status}, { rejectWithValue }) => {
        console.log("update product runs",productId,status);
        try {
            const { data } = await axios.post(
                "http://localhost:3001/api/v1/products/updateProductStatus",
                {productId,status},
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
export default updateProduct;
    