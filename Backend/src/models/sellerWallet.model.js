import mongoose from "mongoose";

const sellerWalletSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SellerModel", // Reference to the seller
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },

});

export const SellerWalletModel = mongoose.model("SellerWalletModel", sellerWalletSchema);
