import {apiError,apiResponse,asyncHandler,AddressModel} from "../../index.js";


const getAllAddress=asyncHandler(async(req,res)=>{
    const userId =req.user._id

let addresses=await AddressModel.aggregate([
  {
    $match: { userId: userId }
  }
])

 res.status(200).json(new apiResponse(200,"Address fetched successfully",addresses))
})

export {getAllAddress}