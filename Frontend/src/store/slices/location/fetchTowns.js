import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchTowns=createAsyncThunk(
    "location/fetchTowns",
    async(cityId,{RejectWithValue})=>{
        try {
            const {data}=await axios.get("http://localhost:3001/api/v1/services/location/towns",{
                withCredentials:true,
                params:{cityId}
            })
            return data.data
        } catch (error) {
            return RejectWithValue(error)
        }
    }
);
export default fetchTowns