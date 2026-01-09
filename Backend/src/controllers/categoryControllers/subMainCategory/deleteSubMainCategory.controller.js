import {apiError,apiResponse,asyncHandler,SubMainCategoryModel} from "../../../index.js";


const deleteSubMainCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    if(!id){
        throw new apiError(400,"Sub main category id is required");
    }
  const subMainCategory=  await SubMainCategoryModel.findByIdAndDelete(id)
    res.status(200).json(new apiResponse(200,"Sub main category deleted successfully",subMainCategory))
})
export {deleteSubMainCategory}