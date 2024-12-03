import mongoose,{Schema} from "mongoose";
const itemSchema = new Schema({
    productId: { type: Schema.ObjectId, ref: "ProductModel" },
})
const WishlistSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "UserModel" },
   item:{
    type:[itemSchema]
   },
   price:{
    type:Number
   },
   totalItems: { type: Number, default: 0 },
});
export const WishlistModel=mongoose.model("WishlistModel",WishlistSchema)