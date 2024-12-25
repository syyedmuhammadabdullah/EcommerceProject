import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

 const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
  async (productId, {rejectWithValue}) => {
    console.log("delete product runs",productId);
    try {
      const {data} = await axios.post(
        'http://localhost:3001/api/v1/products/deleteProduct',
        productId,
        {
          withCredentials: true,
          
        },
      );
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export default deleteProduct;