import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeItemFromWishlist = createAsyncThunk(
  "wishlist/removeItemFromWishlist",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/v1/wishlist/removeItemFromWishlist",
        credentials,
        {
          withCredentials: true,
        }
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export default removeItemFromWishlist;
