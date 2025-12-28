import {apiError,apiResponse,asyncHandler,SellerWalletModel} from '../../index.js' 

export const getSellerBalance=asyncHandler(async(req,res,)=>{
   
    const sellerId=req.seller.sellerId;
    const sellerWallet=await SellerWalletModel.findOne({sellerId});
    if(!sellerWallet){
        throw new apiError(400,"Wallet not found");
    }
    res.status(200).json(new apiResponse(200,"Wallet found successfully",sellerWallet));
})