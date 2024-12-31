import {apiError,apiResponse,asyncHandler,ProductModel} from "../../index.js";

const getAllSellerProducts=asyncHandler(async(req,res)=>{
    const totalProducts=await ProductModel.aggregate([
        {
            $match:{seller:req.seller.sellerId}
        },
        {
            $count:"total"
        }
    ])
    const total=totalProducts[0]?.total
    console.log("total products",total);
    
    const products=await ProductModel.find({seller:req.seller.sellerId});
    if (!products) {
        throw new apiError(404,"Products not found");
    }
    res.status(200).json(new apiResponse(200,"Products found successfully",products,total))
})

export {getAllSellerProducts}