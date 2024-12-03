import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3001/api/v1/users/logout",_,{
                withCredentials: true,
            });
            return response.data.data
               }
               catch (error) {
                return rejectWithValue(error)
            }
        }
    );

export default logoutUser