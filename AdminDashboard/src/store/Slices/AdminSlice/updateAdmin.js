import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const updateAdmin = createAsyncThunk(
    "admin/updateAdmin",
    async ({formData,AdminId}, { rejectWithValue }) => 
        {
        try {

        const response = await axios.put(
            `http://localhost:3001/api/v1/users/updateUserDetails/${AdminId}`,
            formData,{
          headers:  {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        }
        );
        return response.data.data;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
    );

    export default updateAdmin