import mongoose, { Schema } from "mongoose";


const cartItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "ProductModel" },
    quantity: { type: Number, default: 0 },
    price: {
        type: Number,
        default: 0
    },
    unitPrice: {
        type: Number
    },
    name: {
        type: String
    },
    image: {
        type: String
    },
    sellerId: {
        type: Schema.Types.ObjectId
    }
});

const sellerCartSchema = new Schema({
    sellerId: { type: Schema.Types.ObjectId, ref: "SellerModel" },
    sellerName: { type: String },
    items: [cartItemSchema],
    totalItems: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
});

const CartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "UserModel" },
    items: [sellerCartSchema], // Array of seller groups
    totalItems: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
}, { timestamps: true });

export const CartModel=mongoose.model("CartModel",CartSchema)
export const CartItemModel=mongoose.model("CartItemModel",cartItemSchema)
