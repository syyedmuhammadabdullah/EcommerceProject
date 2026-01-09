import {apiError,apiResponse,asyncHandler,SellerModel} from "../../index.js";

const updateSellerStatus=asyncHandler(async(req,res)=>{
    const {sellerId,status}=req.body;
    const seller=await SellerModel.findById(sellerId);
    if(!seller){
        return res.status(400).json(new apiError(400,"Seller not found"));
    }
    if(seller.accountStatus.status===status){
        return res.status(400).json(new apiError(400,"Seller status already updated"));
    }
    seller.accountStatus.status=status;
    seller.accountStatus.updatedAt=Date.now();
    await seller.save();
    res.status(200).json(new apiResponse(200,"Seller status updated successfully",seller));
})
export {updateSellerStatus}