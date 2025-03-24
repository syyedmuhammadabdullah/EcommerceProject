import {apiError,apiResponse,asyncHandler,SellerModel} from '../../index.js';

const updateSellerDetails=asyncHandler(async(req,res)=>{
    console.log("update seller details runs",req.params);
    
    const {sellerId}=req.params;
    const sellerDetails=req.body;
    const seller=await SellerModel.findById(sellerId);
    if(!seller){
        throw new apiError(404,"Seller not found",);
    }
    const updatedSeller=await SellerModel.findByIdAndUpdate(sellerId,sellerDetails,{new:true});
    res.status(200).json(new apiResponse(200,"Seller details updated",updatedSeller));
});

export {updateSellerDetails};