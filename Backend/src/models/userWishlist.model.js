import mongoose,{Schema} from "mongoose";

const WishlistSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "UserModel", required: true, index: true ,unique:true},
   productId: { type: Schema.ObjectId, ref: "ProductModel", required: true, index: true ,unique:true},
   
},{
    timestamps:true
});
export const WishlistModel=mongoose.model("WishlistModel",WishlistSchema)