import mongoose, { Schema } from "mongoose";

const ProductReviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "UserModel", required: true, index: true },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "ProductModel",
        required: true,
        index: true
    },
    rating: { type: Number, required: true, min: 1, max: 5,index: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
});
ProductReviewSchema.index({ productId: 1, userId: 1 }, { unique: true });
export const ProductReviewModel = mongoose.model("ProductReviewModel", ProductReviewSchema);
