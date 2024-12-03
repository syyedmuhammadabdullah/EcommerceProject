import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeItemFromCart=createAsyncThunk(
    "cart/removeItemFromCart",
    async(credentials,{rejectWithValue})=>{
        try {
            const {data} =await axios.post("http://localhost:3001/api/v1/cart/removeItemFromCart",credentials,{
                  withCredentials:true,
                  
              })
               return data.data;
           } catch (error) {
               return rejectWithValue(error);
           }
       
    }
)
export default removeItemFromCart