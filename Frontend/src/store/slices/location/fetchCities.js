import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const fetchCities=createAsyncThunk(
    "location/fetchCities",
    async (stateId, { rejectWithValue }) => {
        try {
         const {data} =await  axios.get("http://localhost:3001/api/v1/services/location/cities",{
               withCredentials:true,
               params:{stateId}
           })
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default fetchCities