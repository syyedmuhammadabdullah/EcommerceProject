import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3001/api/v1/users/login",credentials,{
                withCredentials: true,
            });
            return response.data.data
               }
               catch (error) {
                console.log(error);
                
                return rejectWithValue(error)
            }
        }
    );

export default loginUser