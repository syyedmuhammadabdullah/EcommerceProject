import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateAnswerToProductQuestion = createAsyncThunk(
    "productQuestion/updateAnswerToProductQuestion",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "http://localhost:3001/api/v1/productQuestions/updateAnswerToProductQuestion",
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
export default updateAnswerToProductQuestion