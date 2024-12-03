import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addItemToWishlist = createAsyncThunk(
  "wishlist/addItemToWishlist",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/v1/wishlist/addItemToWishlist",
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
export default addItemToWishlist;
