import { createSlice } from "@reduxjs/toolkit";

const productFormSlice = createSlice({
  name: "productForm",
  initialState: {
    name: "",
    price: 0,
    unitPrice: 0,
    discount: 0,
    discountPrice: 0,
    deliveryCharges: 150,
    deliveryTime: "5-7 business days",
    currentStock: 0,
    brand: "",
    description: "",
    warrenty: "Warrenty not available",
    image: "",
    imagePublic_id: "",
    additionalImages: [],
    tags: [],
    category: "",
    subCategory: "",
    quantity: 0,
    maxQuantity: 0,
    totalRating: 0,
    averageRating: 0,
    ratingCount: 0,
    fiveStars: 0,
    fourStars: 0,
    threeStars: 0,
    twoStars: 0,
    oneStars: 0,
    stockStatus: "in stock",
    attribute: [],
    sku: "",
    dimensions: { length: 0, width: 0, height: 0 },
    weight: 0,
    variants: [],
    seller: "",
  },
  reducers: {
    updateProductFormData: (state, action) => {
        const { name, value } = action.payload;
  
        if (name === "attribute") {
          state.attribute = value; // Directly update the attribute array
        } else if (name === "dimensions") {
          state.dimensions = { ...state.dimensions, ...value }; // Update nested dimensions
        } else {
          state[name] = value; // For other fields
        }
      }
    
  },
});

export const { updateProductFormData } = productFormSlice.actions;
export default productFormSlice.reducer;