import {apiError,apiResponse,asyncHandler,SubMainCategoryModel} from "../../../index.js";


const deleteSubMainCategory=asyncHandler(async(req,res)=>{
    const {subMainCategoryId}=req.body;
    if(!subMainCategoryId){
        throw new apiError(400,"Sub main category id is required");
    }
    await SubMainCategoryModel.findByIdAndDelete(subMainCategoryId)
    res.status(200).json(new apiResponse(200,"Sub main category deleted successfully",null))
})
export {deleteSubMainCategory}