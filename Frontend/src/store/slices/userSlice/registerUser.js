import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const registerUser = createAsyncThunk(
    "auth/register",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3001/api/v1/users/register",credentials,{
                withCredentials: true,
            });
            return response.data.data
               }
               catch (error) {
                return rejectWithValue(error)
            }
        }
    );

export default registerUser