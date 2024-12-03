import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateProductQuestion = createAsyncThunk(
    "productQuestion/updateProductQuestion",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "http://localhost:3001/api/v1/productQuestions/updateProductQuestion",
                credentials,
                {
                    withCredentials: true,
                }
            );
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default updateProductQuestion