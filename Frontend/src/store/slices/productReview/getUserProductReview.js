import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getUserProductReview = createAsyncThunk(
    "productReview/getUserProductReview",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("http://localhost:3001/api/v1/productReviews/getUserProductReview", {
                withCredentials: true,
            })
            console.log(data.data);
            
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export default getUserProductReview