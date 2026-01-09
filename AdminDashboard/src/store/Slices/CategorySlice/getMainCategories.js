import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getMainCategories = createAsyncThunk(
    "category/getMainCategories",
    async (	search, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/categories/getMainCategories",
                {
                    params: search ,
                    withCredentials: true,
                }
            );
            console.log(data);
            
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export default getMainCategories;