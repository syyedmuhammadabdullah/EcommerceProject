import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getSubCategories = createAsyncThunk(
    "category/getSubCategories",
    async ({search,page=1,limit=10}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/categories/getSubCategories",
                {
                    params: { search, page, limit },
                    withCredentials: true,
                }
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export default getSubCategories;