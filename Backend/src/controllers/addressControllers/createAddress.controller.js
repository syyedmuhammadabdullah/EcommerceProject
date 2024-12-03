import {apiError,apiResponse,asyncHandler,AddressModel} from "../../index.js";


const createAddress=asyncHandler(async(req,res)=>{
    console.log("create address runs");
    const {fullName,phone,country,state,city,town,postalCode,addressOne,addressTwo,landmark}=req.body;
    console.log(fullName,phone,country,state,city,town,postalCode,addressOne);
    if(!fullName || !phone || !country || !state || !city  || !postalCode || !addressOne){
        throw new apiError(400,"All fields are required");
    }
    const addressCount=await AddressModel.countDocuments({userId:req.user._id})
    const isDefault=addressCount===0
    
    const address=await AddressModel.create({
        userId:req.user._id,
        fullName,
        phone,
        country,
        state,
        city,
        town:town? town : "",
        postalCode,
        addressOne,
        addressTwo:addressTwo? addressTwo : "",
        landmark:landmark? landmark : "",
        isDefaultShipping:isDefault,
        isDefaultBilling:isDefault,
    });

    res.status(200).json(new apiResponse(200,"Address created successfully",address))
})

export {createAddress}
