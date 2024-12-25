import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serialize } from 'object-to-formdata';

const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({productForm,images}, { rejectWithValue }) => {
        const credentials = serialize({...productForm,images});
        try {
            const { data } = await axios.post(
                "http://localhost:3001/api/v1/products/updateProductDetails",
                credentials,
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
    