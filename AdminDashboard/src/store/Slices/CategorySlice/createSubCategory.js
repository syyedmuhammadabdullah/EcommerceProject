import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createSubCategory=createAsyncThunk(
    "category/createSubCategory",
    async(data,{rejectWithValue})=>{
        try {
            const response = await axios.post(
                "http://localhost:3001/api/v1/categories/createSubCategory",
                data,
                {
                    withCredentials: true,
                }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export default createSubCategory;