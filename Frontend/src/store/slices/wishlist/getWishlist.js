import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/api/v1/wishlist/getWishlist",
        {
          withCredentials: true,
        }
      );
      console.log(data.data);

      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export default getWishlist;
