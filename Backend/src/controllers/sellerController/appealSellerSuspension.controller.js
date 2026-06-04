import {apiError,apiResponse,asyncHandler ,SellerModel} from "../../index.js";


const appealSellerSuspension=asyncHandler(async(req,res)=>{
    const {reason}=req.body;
    const sellerId=req.seller.sellerId
    if(!sellerId){
        throw new apiError(400,"Seller id is required");
    }
    if(!reason){
        throw new apiError(400,"Reason is required");
    }
    const seller=await SellerModel.findById(sellerId);
    if(!seller){
        throw new apiError(400,"Seller not found");
    }
    if(seller.accountStatus.status!=="suspended"){
        throw new apiError(400,"Seller is not suspended");
    }
    seller.accountStatus.status="reviewing";
    seller.accountStatus.appealReason=reason;
    await seller.save();
    res.status(200).json(new apiResponse(200,"Seller appealed successfully",seller));
})
export {appealSellerSuspension}