import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const addItemToCart=createAsyncThunk(
    "cart/addItemToCart",
    async(credentials,{rejectWithValue})=>{
        try {
            const {data} =await axios.post("http://localhost:3001/api/v1/cart/addItemToCart",credentials,{
                  withCredentials:true,
                  
              })
               return data.data;
           } catch (error) {
               return rejectWithValue(error);
           }
       
    }
)
export default addItemToCart