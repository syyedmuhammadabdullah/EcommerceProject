import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getProductQuestion = createAsyncThunk(
    "productQuestion/getProductQuestion",
    async (productId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `http://localhost:3001/api/v1/productQuestions/getProductQuestion`,
                {
                    withCredentials: true,
                    params: { productId },
                }
            );
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getProductQuestion