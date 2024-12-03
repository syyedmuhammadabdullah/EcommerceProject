import { configureStore } from "@reduxjs/toolkit";
import {
  addressBookReducer,
  authReducer,
  locationReducer,
  cartReducer,
  wishlistReducer,
  productReviewReducer,
  orderReducer,
  productReducer,
  paymentReducer,
  productQuestionReducer
} from "../index";
const store = configureStore(
  {
    reducer: {
      auth: authReducer,
      location: locationReducer,
      addressBook: addressBookReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
      order: orderReducer,
      product: productReducer,
      payment: paymentReducer,
      productReviews: productReviewReducer,
      productQuestions: productQuestionReducer
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  }
);

export default store;
