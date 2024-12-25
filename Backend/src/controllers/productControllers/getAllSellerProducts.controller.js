import {apiError,apiResponse,asyncHandler,ProductModel} from "../../index.js";

const getAllSellerProducts=asyncHandler(async(req,res)=>{
    console.log("get all seller products runs",req.seller._id);
    
    const products=await ProductModel.find({seller:req.seller._id});
    if (!products) {
        throw new apiError(404,"Products not found");
    }
    res.status(200).json(new apiResponse(200,"Products found successfully",products))
})

export {getAllSellerProducts}