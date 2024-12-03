import {apiError,apiResponse,asyncHandler,MainCategoryModel} from "../../../index.js";

const deleteMainCategory=asyncHandler(async(req,res)=>{
    const {mainCategoryId}=req.body;
    if(!mainCategoryId){
        throw new apiError(400,"Main category id is required");
    }
    await MainCategoryModel.findByIdAndDelete(mainCategoryId)
    res.status(200).json(new apiResponse(200,"Main category deleted successfully",null))
})
export {deleteMainCategory}