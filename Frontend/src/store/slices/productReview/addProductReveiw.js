import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addProductReview = createAsyncThunk(
    "productReview/addProductReview",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("http://localhost:3001/api/v1/productReviews/createProductReview",credentials, {
                withCredentials: true,
            })
            
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export default addProductReview