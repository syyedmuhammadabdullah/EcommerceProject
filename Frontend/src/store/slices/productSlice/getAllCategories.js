import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const getAllCategories = createAsyncThunk(
    "product/getAllCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:3001/api/v1/categories/getAllCategories");
            return response.data.data; // Assuming the categories are in the 'data' field of the response
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to fetch categories");
        }
    }
);

export default getAllCategories