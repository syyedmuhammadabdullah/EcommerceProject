import mongoose,{Schema} from "mongoose";

const ProductQuestionSchema=new Schema({
    productId:{
        type:Schema.Types.ObjectId,
        ref:"ProductModel",
        required:true,
        index:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"UserModel",
        required:true,
    },
    userName:{
        type:String
    },
    storeName:{
        type:String
    },
    sellerId:{
        type:Schema.Types.ObjectId,
        ref:"SellerModel",
        // required:true
    },
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String
    },
    
},{timestamps:true});

export const ProductQuestionModel=mongoose.model("ProductQuestionModel",ProductQuestionSchema);