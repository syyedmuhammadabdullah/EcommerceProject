import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serialize } from 'object-to-formdata';


const createProduct = createAsyncThunk(
    "product/createProduct",
    async ({productForm,images}, { rejectWithValue }) => {
        try {
            console.log(images);
            
            const Data = {...productForm,images};
            // Append credentials to formData
            const formData = serialize(Data);
            console.log(formData);
            
            
            // for (const [key, value] of Object.entries(productForm)) {
              
            //     formData.append(key, value);
            // }
      
            // // Append images to formData
            // images.forEach((image, index) => {
            //     console.log("Appending image file:", image)
            //   formData.append(`image${index}`, image);
            // });

            // if (Array.isArray(productForm.attributes) && productForm.attributes.length > 0) {
            //     productForm.additionalImages.forEach((attribute, index) => {
            //       formData.append(`attributes[${index}]`, attribute);
            //     });
            //   }

            
            const { data } = await axios.post(
                "http://localhost:3001/api/v1/products/createProduct",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
              
            );
            console.log(data.data);
            
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export default createProduct