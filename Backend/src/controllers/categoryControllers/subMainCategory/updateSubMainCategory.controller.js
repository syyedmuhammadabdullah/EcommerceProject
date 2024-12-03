import {apiError,apiResponse,asyncHandler,SubMainCategoryModel} from "../../../index.js";

const updateSubMainCategory=asyncHandler(async(req,res)=>{
    const {subMainCategoryId,name}=req.body;
    if(!subMainCategoryId || !name){
        throw new apiError(400,"All fields are required")
    }
    const subMainCategory=await SubMainCategoryModel.findById(subMainCategoryId)
    if(!subMainCategory){
        throw new apiError(404,"Sub main category not found")
    }
    subMainCategory.name=name
    await subMainCategory.save()
    res.status(200).json(new apiResponse(200,"Sub main category updated successfully",subMainCategory))
})
export {updateSubMainCategory}