import {apiError,apiResponse,asyncHandler,AddressModel} from "../../index.js";


const getSingleAddress=asyncHandler(async(req,res)=>{
    const {addressId}=req.body
    const address=await AddressModel.findById(addressId)

    res.status(200).json(new apiResponse(200,"Address updated successfully",address))
})

export {getSingleAddress}