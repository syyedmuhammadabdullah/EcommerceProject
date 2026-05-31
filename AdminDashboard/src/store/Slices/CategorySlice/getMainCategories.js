import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getMainCategories = createAsyncThunk(
    "category/getMainCategories",
    async ({search,page=1,limit=10}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/categories/getMainCategories",
                {
                    params: { search, page, limit },
                    withCredentials: true,
                }
            );
            console.log(data);
            
            return data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export default getMainCategories;