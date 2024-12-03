import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import {getAllAddress} from "../../../index"
const deleteAddress=createAsyncThunk(
    "addressBook/deleteAddress",
    async(credentials,{rejectWithValue,dispatch})=>{
        try {
            const {data} =await axios.post("http://localhost:3001/api/v1/address/deleteAddress",credentials,{
                  withCredentials:true,
                  
              })
              dispatch(getAllAddress())
           } catch (error) {
               return rejectWithValue(error);
           }
       
    }
)
export default deleteAddress