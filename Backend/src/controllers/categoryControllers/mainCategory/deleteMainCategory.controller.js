import {apiError,apiResponse,asyncHandler,MainCategoryModel} from "../../../index.js";

const deleteMainCategory=asyncHandler(async(req,res)=>{    
    const {id}=req.params;
    if(!id){
        throw new apiError(400,"Main category id is required");
    }
   const mainCategory= await MainCategoryModel.findByIdAndDelete(id)
    res.status(200).json(new apiResponse(200,"Main category deleted successfully",mainCategory))
})
export {deleteMainCategory}