import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getProductDetails = createAsyncThunk(
    "product/getProductDetails",
    async (productId, { rejectWithValue }) => {
        try {
         const {data} =await  axios.get(`http://localhost:3001/api/v1/products/getOneProduct`,{
               withCredentials:true,
               params:{productId}
           })
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default getProductDetails