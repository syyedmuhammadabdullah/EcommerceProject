import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllSellers = createAsyncThunk(
    "seller/getAllSellers",
    async ({page,limit,search}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/sellers/getAllSellers",
                
                {
                    params: {page,limit,search},
                    withCredentials: true,
                }
            );
            
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getAllSellers;