import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const updateSeller = createAsyncThunk(
    "seller/updateSeller",
    async ({formData,sellerId}, { rejectWithValue }) => 
        {
        try {

        const response = await axios.put(
            `http://localhost:3001/api/v1/sellers/updateSellerDetails/${sellerId}`,
            formData,{
          headers:  {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        }
        );
        return response.data.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
    );

    export default updateSeller