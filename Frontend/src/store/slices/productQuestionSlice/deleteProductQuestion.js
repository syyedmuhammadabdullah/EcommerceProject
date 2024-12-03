import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteProductQuestion = createAsyncThunk(
    "productQuestion/deleteProductQuestion",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:3001/api/v1/productQuestions/deleteProductQuestion/${id}`,
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
export default deleteProductQuestion