import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const createAddress=createAsyncThunk(
    "addressBook/createAddress",
    async(credentials,{rejectWithValue})=>{
        try {
            const {data} =await axios.post("http://localhost:3001/api/v1/address/createAddress",credentials,{
                  withCredentials:true,
                  
              })
               return data.data;
           } catch (error) {
               return rejectWithValue(error);
           }
       
    }
)
export default createAddress