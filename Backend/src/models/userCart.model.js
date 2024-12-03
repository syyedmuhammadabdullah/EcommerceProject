import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "ProductModel" },
    quantity: { type: Number, default: 0 },
    price:{
        type:Number,
        default:0
    },
    unitPrice:{
        type:Number
    },
    name:{
        type:String
    },
    image:{
        type:String
    }

});

const CartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "UserModel" },
    items:{
        type:Array
    },
    totalItems: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },

    
},{timestamps:true});
export const CartModel=mongoose.model("CartModel",CartSchema)
export const CartItemModel=mongoose.model("CartItemModel",cartItemSchema)
