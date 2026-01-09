import {apiError,apiResponse,asyncHandler,SellerModel} from "../../index.js";

const getAllSellers=asyncHandler(async(req,res)=>{
    const page=req.query.page||1;
    const limit=req.query.limit||10;
    const search=req.query.search || "";
    const sellers=await SellerModel.find({"storeDetails.storeName": { $regex:search, $options: "i" }}).select("storeDetails.storeName accountStatus.status").skip((page-1)*limit).limit(limit);
   
    if(!sellers){
        return res.status(400).json(new apiError(400,"Sellers not found"));
    }
    res.status(200).json(new apiResponse(200,"Sellers found successfully",sellers));
})
export {getAllSellers}