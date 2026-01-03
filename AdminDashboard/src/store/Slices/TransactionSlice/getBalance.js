import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

 const getBalance = createAsyncThunk(
  "transactions/getBalance",
  async (_, { rejectWithValue }) => {
    try {      
      const response = await axios.get("http://localhost:3001/api/v1/transactions/balance", {
        withCredentials: true,
      });
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      );
    }
  }
);
export default getBalance;