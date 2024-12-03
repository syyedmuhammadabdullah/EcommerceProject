import {apiResponse,asyncHandler,MainCategoryModel} from "../../../index.js";

const getMainCategory=asyncHandler(async(req,res)=>{
    const mainCategories=await MainCategoryModel.find()
    res.status(200).json(new apiResponse(200,"Main categories fetched successfully",mainCategories))
})
export {getMainCategory}