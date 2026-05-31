import {apiResponse,asyncHandler,MainCategoryModel} from "../../../index.js";

const getMainCategory=asyncHandler(async(req,res)=>{
    
    const search=req.query.search||""
    const page=parseInt(req.query.page)||1
    const limit=parseInt(req.query.limit)||10
    const mainCategories=await MainCategoryModel.find({name: { $regex: search, $options: "i" }})
    .skip((page - 1) * limit)
    .limit(limit);
    const totalCategories=await MainCategoryModel.countDocuments()

    res.status(200).json(new apiResponse(200,"Main categories fetched successfully",mainCategories,totalCategories))
})
export {getMainCategory}