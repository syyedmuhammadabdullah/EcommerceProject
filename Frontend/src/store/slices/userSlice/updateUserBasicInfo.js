import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateUserBasicInfo = createAsyncThunk(
    "auth/updateUserBasicInfo",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3001/api/v1/users/updateBasicInfo",credentials,{
                withCredentials: true,                
            });
            return response.data.data
               }
               catch (error) {
                return rejectWithValue(error)
            }
        }
    );

export default updateUserBasicInfo