import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const createProduct = createAsyncThunk(
    "product/createProduct",
    async ({formData}, { rejectWithValue }) => {
        try {            
            const { data } = await axios.post(
                "http://localhost:3001/api/v1/products/createProduct",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
              
            );
            
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default createProduct