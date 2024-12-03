import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createStripePayment = createAsyncThunk(
    "payment/createStripePayment",
    async (amount, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "http://localhost:3001/api/v1/payment/stripe/create-payment",
               {amount},
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default createStripePayment;