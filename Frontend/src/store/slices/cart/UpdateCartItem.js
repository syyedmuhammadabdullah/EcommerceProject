import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

const updateCartitem=createAsyncThunk(
    "cart/updateCartItem",
 async(Credential,{rejectWithValue})=>{
    try {
        const {data}=await axios.post("http://localhost:3001/api/v1/cart/updateCartItem",Credential,{
            withCredentials:true
        })
        console.log(data);
        
        return data.data
    } catch (error) {
        return rejectWithValue(error)
    }
 }
)
export default updateCartitem