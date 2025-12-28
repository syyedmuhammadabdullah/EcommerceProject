import {apiError,apiResponse,asyncHandler,SellerWalletModel} from "../../index.js";

const getSellerWallet=asyncHandler(async(req,res)=>{
    console.log("get seller wallet runs",req.seller.sellerId);
    const sellerWallet=await SellerWalletModel.findOne({sellerId:req.seller.sellerId});
    if(!sellerWallet){
        throw new apiError(400,"Seller wallet not found");
    }
    res.status(200).json(new apiResponse(200,"Seller wallet found successfully",sellerWallet));
})
export {getSellerWallet}