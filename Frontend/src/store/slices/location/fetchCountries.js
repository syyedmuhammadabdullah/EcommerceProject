import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchCountries = createAsyncThunk(
    "location/fetchCountries",
    async (_, { rejectWithValue }) => {
        try {
         const {data} =await  axios.get("http://localhost:3001/api/v1/services/location/countries",{
               withCredentials:true
           })
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default fetchCountries