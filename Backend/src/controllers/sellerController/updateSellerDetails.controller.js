import {apiError,apiResponse,asyncHandler,SellerModel} from '../../index.js';

const updateSellerDetails=asyncHandler(async(req,res)=>{
    const {sellerId}=req.body;
    const sellerDetails=req.body;
    const seller=await SellerModel.findById(sellerId);
    if(!seller){
        throw new apiError(res,"Seller not found",404);
    }
    const updatedSeller=await SellerModel.findByIdAndUpdate(sellerId,sellerDetails,{new:true});
    res.status(200).json(new apiResponse(200,"Seller details updated",updatedSeller));
});

export {updateSellerDetails};