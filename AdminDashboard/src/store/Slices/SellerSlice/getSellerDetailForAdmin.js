import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getSellerDetailForAdmin = createAsyncThunk(
    "seller/getSellerDetailForAdmin",
    async ({range,sellerId}, { rejectWithValue }) => {
        try {
                
            const { data } = await axios.get(
                `http://localhost:3001/api/v1/sellers/getSellerDetailForAdmin`,
                {
                    params:{sellerId,range},
                    withCredentials: true,
                }
            );

            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getSellerDetailForAdmin;