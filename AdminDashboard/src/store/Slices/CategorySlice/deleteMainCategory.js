import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteMainCategory = createAsyncThunk(
    "category/deleteMainCategory",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `http://localhost:3001/api/v1/categories/deleteMainCategory/${id}`,
                {
                  
                    withCredentials: true,
                }
            );
            
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export default deleteMainCategory