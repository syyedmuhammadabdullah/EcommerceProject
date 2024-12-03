import { createAsyncThunk } from "@reduxjs/toolkit";
const confirmStripePayment = createAsyncThunk(
    "payment/confirmStripePayment",
    async ({clientSecret,cardElement,stripe}, { rejectWithValue }) => {
       
    try {
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        })
       
       
            return result.paymentIntent.status
      
        }
     catch (error) {
        
        return rejectWithValue(result.error.message);
    }
})
export default confirmStripePayment