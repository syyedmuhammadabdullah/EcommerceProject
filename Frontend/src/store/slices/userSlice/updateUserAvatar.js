import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateUserAvatar = createAsyncThunk(
    "auth/updateUserAvatar",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3001/api/v1/users/updateAvatar",formData,{
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data.data
               }
               catch (error) {
                return rejectWithValue(error)
            }
        }
    );

export default updateUserAvatar