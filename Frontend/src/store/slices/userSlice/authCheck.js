import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authCheck=createAsyncThunk(
    "auth/authCheck",
    async(_,{rejectWithValue})=>{
        try {
            const response = await axios.get("http://localhost:3001/api/v1/users/check",{
                withCredentials: true,
            });
           
            return response.data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export default authCheck