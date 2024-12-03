import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const changeDefaultAddress=createAsyncThunk(
    "addressBook/changeDefaultAddress",
    async(credentials,{rejectWithValue})=>{
        try {
            const {data} =await axios.post("http://localhost:3001/api/v1/address/changeDefaultAddress",credentials,{
                  withCredentials:true,
                  
              })
             return data.data;
              
           } catch (error) {
               return rejectWithValue(error.message);
           }
       
    }
)
export default changeDefaultAddress