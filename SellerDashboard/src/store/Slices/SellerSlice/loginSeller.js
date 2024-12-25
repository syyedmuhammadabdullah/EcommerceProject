import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginSeller = createAsyncThunk(
    "seller/loginSeller",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "http://localhost:3001/api/v1/sellers/loginSeller",
                credentials,
                {
                    withCredentials: true,
                }
            );
            console.log(data);
            
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export default loginSeller;