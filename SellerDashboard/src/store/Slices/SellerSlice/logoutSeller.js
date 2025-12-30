import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const logoutSeller = createAsyncThunk(
    "seller/logout",
    async (_, { rejectWithValue }) => {
        try {
          console.log("logout called");
          
            const response = await axios.post("http://localhost:3001/api/v1/users/logout",{
              role: "seller"
            },{
             
                withCredentials: true,
            });
            return response.data.data
               }
               catch (error) {
                return rejectWithValue(error)
            }
        }
    );

export default logoutSeller