import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const updateSeller = createAsyncThunk(
    "seller/updateSeller",
    async (seller, { rejectWithValue }) => {
        try {
        const response = await axios.put(
            `http://localhost:3001/api/v1/sellers/updateSellerDetails/${seller.sellerId}`,
            seller,
            {
            withCredentials: true,
            }
        );
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
    );

    export default updateSeller