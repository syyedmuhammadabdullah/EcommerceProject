import {apiResponse,asyncHandler,MainCategoryModel} from "../../../index.js";

const getMainCategory=asyncHandler(async(req,res)=>{
    
    const search=req.query.search||""
    const mainCategories=await MainCategoryModel.find({name: { $regex: search, $options: "i" }})
    
    res.status(200).json(new apiResponse(200,"Main categories fetched successfully",mainCategories))
})
export {getMainCategory}