import {apiError, apiResponse,SellerModel,asyncHandler} from "../../index.js";

const getSeller=asyncHandler(async(req,res)=>{
    const seller=await SellerModel.findById(req.seller.sellerId);
    if(!seller){
        return res.status(400).json(new apiError(400,"Seller not found"));
    }
    res.status(200).json(new apiResponse(200,"Seller found successfully",seller));
})
export {getSeller}