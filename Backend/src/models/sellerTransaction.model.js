import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SellerWalletModel", // Reference to seller's wallet
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SellerModel", // Store seller reference for easier lookups
    required: true,
  },
  type: {
    type: String,
    enum: ["order_payment", "withdrawal", "refund"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const SellerTransactionModel = mongoose.model("SellerTransactionModel", TransactionSchema);
