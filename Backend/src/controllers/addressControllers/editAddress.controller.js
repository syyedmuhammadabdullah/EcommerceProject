import {apiError,apiResponse,asyncHandler,AddressModel} from "../../index.js";


const editAddress=asyncHandler(async(req,res)=>{
    const {fullName,phone,country,state,city,town,postalCode,addressOne,addressTwo,landmark}=req.body;

    if(!fullName || !phone || !country || !state || !city || !town || !postalCode || !addressOne){
        res.status(400).json( new apiError(400,"All fields are required"));
    }

    const address=await AddressModel.findOneAndUpdate(req.user.id,{
        fullName,
        phone,
        country,
        state,
        city,
        town,
        postalCode,
        addressOne,
        addressTwo:addressTwo? addressTwo : "",
        landmark:landmark? landmark : ""

    });

    res.status(200).json(new apiResponse(200,"Address updated successfully",address))
})
export {editAddress}