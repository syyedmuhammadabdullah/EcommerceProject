import {apiError, apiResponse,SellerModel,asyncHandler} from "../../index.js";

const getSeller=asyncHandler(async(req,res)=>{
    let sellerId;
    if(req.query.sellerId){
        sellerId=req.query.sellerId
    }else if(req.seller && req.seller.sellerId){
        sellerId=req.seller.sellerId
    }
    const seller=await SellerModel.findById(sellerId);
    if(!seller){
        return res.status(400).json(new apiError(400,"Seller not found"));
    }
    res.status(200).json(new apiResponse(200,"Seller found successfully",seller));
})
export {getSeller}