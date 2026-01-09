import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteSubCategory = createAsyncThunk(
    "category/deleteSubCategory",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `http://localhost:3001/api/v1/categories/deleteSubCategory/${id}`,
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
export default deleteSubCategory;