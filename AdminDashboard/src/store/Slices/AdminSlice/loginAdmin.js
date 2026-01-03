import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginAdmin = createAsyncThunk(
    "admin/loginAdmin",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "http://localhost:3001/api/v1/admin/login",
                credentials,
                {
                    withCredentials: true,
                }
            );
            
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export default loginAdmin;