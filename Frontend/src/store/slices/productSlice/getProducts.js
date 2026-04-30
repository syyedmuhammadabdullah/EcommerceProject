import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

 const getProducts = createAsyncThunk(
    "product/getProducts",
    async ({pageNum,limit}, { rejectWithValue }) => {
        try {
            const {data} = await axios.get(`http://localhost:3001/api/v1/products/getProducts?page=${pageNum}&limit=${limit}`);
       
           
            return data.data; // Assuming the products are in the 'data' field of the response
        }
        catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to fetch products");
        }
    }
);

export default getProducts