import mongoose from "mongoose";

const WithdrawalSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SellerModel",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    enum: ["bank_transfer", "paypal", "stripe", "jazzcash", "easypaisa"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SellerTransactionModel", // Reference to transaction record
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const SellerWithdrawalModel = mongoose.model("SellerWithdrawalModel", WithdrawalSchema);
