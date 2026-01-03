import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getPendingWithdrawRequest = createAsyncThunk(
    "transaction/getPendingWithdrawRequest",
    async ({filter,search="",page=1,limit=10}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "http://localhost:3001/api/v1/transactions/getPendingWithdrawRequest",
                {
                    params: {
                        filter,
                        search,
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
export default getPendingWithdrawRequest