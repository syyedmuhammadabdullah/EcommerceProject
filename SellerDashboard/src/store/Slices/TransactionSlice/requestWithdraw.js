import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const requestWithdraw = createAsyncThunk(
    'transaction/requestWithdraw',
    async ({amount}, {rejectWithValue}) => {
        try {
            
            const response = await axios.post('http://localhost:3001/api/v1/transactions/requestWithdraw', {amount}, {
                withCredentials: true,
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export default requestWithdraw;