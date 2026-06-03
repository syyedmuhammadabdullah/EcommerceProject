import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getProductQuestion = createAsyncThunk(
    "productQuestion/getProductQuestion",
    async ({productId,page=1,limit=5}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `http://localhost:3001/api/v1/productQuestions/getProductQuestion`,
                {
                    withCredentials: true,
                    params: { productId, page, limit },
                }
            );
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getProductQuestion