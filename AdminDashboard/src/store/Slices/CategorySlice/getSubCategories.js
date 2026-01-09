import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getSubCategories = createAsyncThunk(
    "category/getSubCategories",
    async (search, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/categories/getSubCategories",
                {
                    params: search,
                    withCredentials: true,
                }
            );
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export default getSubCategories;