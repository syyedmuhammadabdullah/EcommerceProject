import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateSellerStatus = createAsyncThunk(
    "seller/updateSellerStatus",
    async ({ sellerId, accountStatus }, { rejectWithValue }) => {
        
        try {
            const { data } = await axios.post(
                `http://localhost:3001/api/v1/sellers/updateSellerStatus`,
                {
                    accountStatus,
                    sellerId,
                },
                {
                    withCredentials: true,
                }
            );
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default updateSellerStatus;