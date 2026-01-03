import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createAdmin = createAsyncThunk(
    "admin/createAdmin",
    async ({ adminForm }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "http://localhost:3001/api/v1/admin/register",
                adminForm,
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

export default createAdmin;