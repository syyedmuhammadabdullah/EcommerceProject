import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serialize } from 'object-to-formdata';

const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({formData}, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "http://localhost:3001/api/v1/products/updateProductDetails",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            );
            console.log(data);
            
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default updateProduct;
    