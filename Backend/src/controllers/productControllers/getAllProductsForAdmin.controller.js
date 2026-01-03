import {apiError,apiResponse,asyncHandler,ProductModel} from "../../index.js";

const getAllProductsForAdmin=asyncHandler(async(req,res)=>{
    const {page=1,limit=10,search,filter}=req.query
    let query={};
    if (filter && filter!=="all") {
        query.status=filter
    }
    const products=await ProductModel.find({name: { $regex: search, $options: "i" },...query}).select("stockStatus category price name status   image").populate({path:"seller", select:"storeDetails.storeName"}).skip((page-1)*limit).limit(limit);
    if(!products){
        return res.status(400).json(new apiError(400,"Products not found"));
    }
    res.status(200).json(new apiResponse(200,"Products found successfully",products));
})
export {getAllProductsForAdmin}