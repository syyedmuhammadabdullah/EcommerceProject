import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getSellerAllProducts = createAsyncThunk(
  "product/getSellerAllProducts",
  async (
    { sellerId, search = "", filter = "all", page = 1, limit = 10 },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/api/v1/products/getAllSellerProducts",
        {
          params: {
            sellerId,
            search,
            filter,
            page,
            limit
          },
          withCredentials: true,
        }
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export default getSellerAllProducts