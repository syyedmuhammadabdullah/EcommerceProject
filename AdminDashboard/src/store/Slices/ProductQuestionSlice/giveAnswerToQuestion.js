import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const giveAnswerToQuestion = createAsyncThunk(
    "productQuestion/giveAnswerToQuestion",
    async ({productQuestionId,answer}, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "http://localhost:3001/api/v1/productQuestions/updateAnswerToProductQuestion",
                {productQuestionId,answer},
                {
                    withCredentials: true,
                }
            );
            console.log(data);
            
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default giveAnswerToQuestion