import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAdmin = createAsyncThunk(
    "admin/getAdmin",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/admin/getAdmin",
                {
                    withCredentials: true,
                }
            );
            
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getAdmin;