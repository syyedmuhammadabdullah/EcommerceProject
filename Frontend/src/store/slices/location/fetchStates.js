import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchStates = createAsyncThunk(
    "location/fetchStates",
    async (countryId, { rejectWithValue }) => {
        try {
         const {data} =await  axios.get("http://localhost:3001/api/v1/services/location/states",{
               withCredentials:true,
               params:{countryId}
           })
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default fetchStates