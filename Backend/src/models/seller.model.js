import mongoose,{Schema} from "mongoose";


const SellerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    avatar: { type: String },
});
export const SellerModel=mongoose.model("SellerModel",SellerSchema)

