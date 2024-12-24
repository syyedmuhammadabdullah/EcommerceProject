import mongoose,{Schema} from "mongoose";


const SellerSchema = new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"UserModel",required:true},
    name: { type: String, },
    email: { type: String,  },
    password: { type: String,},
    phoneNumber: { type: String },
    address: { type: String },
    avatar: { type: String },
});
export const SellerModel=mongoose.model("SellerModel",SellerSchema)

