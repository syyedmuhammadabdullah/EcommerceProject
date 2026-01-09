import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getSellerDetailForAdmin = createAsyncThunk(
    "seller/getSellerDetailForAdmin",
    async (id, { rejectWithValue }) => {
        try {
                console.log("id",id);
                
            const { data } = await axios.get(
                `http://localhost:3001/api/v1/sellers/getSellerDetailForAdmin`,
                {
                    params:{sellerId:id},
                    withCredentials: true,
                }
            );

            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getSellerDetailForAdmin;