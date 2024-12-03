import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProductReview } from "../../../index";
import axios from "axios";
const updateProductReview = createAsyncThunk(
    "productReview/updateProductReview",
    async (credentials, { rejectWithValue }) => {
        try {
            await axios.post("http://localhost:3001/api/v1/productReviews/updateProductReview",credentials, {
                withCredentials: true,
            })
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export default updateProductReview