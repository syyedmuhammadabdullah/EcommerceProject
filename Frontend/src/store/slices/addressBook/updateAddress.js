import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const updateAddress=createAsyncThunk(
    "addressBook/updateAddress",
    async(credentials,{rejectWithValue})=>{
        try {
            const {data} =await axios.get("http://localhost:3001/api/v1/services/location/countries",credentials,{
                  withCredentials:true,
                  
              })
               return data.data;
           } catch (error) {
               return rejectWithValue(error);
           }
       
    }
)
export default updateAddress

