import mongoose,{ Schema } from "mongoose";

const addressSchema=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"UserModel"},
    fullName:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    town:{
        type:String,
    },
    postalCode:{
        type:Number,
        required:true
    },
    addressOne:{
        type:String,
        required:true
    },
    addressTwo:{
        type:String,
    },
    landmark:{
        type:String,
    },
    isDefaultShipping:{
        type:Boolean
    },
    isDefaultBilling:{
        type:Boolean
    }
})

export const AddressModel=mongoose.model("AddressModel",addressSchema)