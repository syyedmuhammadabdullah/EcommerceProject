import {apiError,apiResponse,asyncHandler,AddressModel} from "../../index.js";


const deleteAddress=asyncHandler(async(req,res)=>{
    const {addressId}=req.body;
    if(!addressId){
      throw new apiError(400,"Address id is required");
    }

  await AddressModel.findByIdAndDelete(addressId)
    res.status(200).json(new apiResponse(200,"Address deleted successfully",null))
})

export {deleteAddress}