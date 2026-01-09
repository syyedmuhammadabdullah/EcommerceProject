import {apiError,apiResponse,asyncHandler,MainCategoryModel} from "../../../index.js";


const updateMainCategory=asyncHandler(async(req,res)=>{
    const {id,name}=req.body;
    if(!id || !name){
        throw new apiError(400,"All fields are required")
    }
    const mainCategory=await MainCategoryModel.findById(id)
    if(!mainCategory){
        throw new apiError(404,"Main category not found")
    }
    mainCategory.name=name
    await mainCategory.save()
    res.status(200).json(new apiResponse(200,"Main category updated successfully",mainCategory))
})
export {updateMainCategory}