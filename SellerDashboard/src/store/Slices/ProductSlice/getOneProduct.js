import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getOneProduct = createAsyncThunk(
  "product/getOneProduct",
  async (id, { rejectWithValue }) => {
    console.log("id",id);
    
    try {
      const { data } = await axios.get(`http://localhost:3001/api/v1/products/getOneSellerProduct`, {
        params: { productId: id },
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export default getOneProduct;