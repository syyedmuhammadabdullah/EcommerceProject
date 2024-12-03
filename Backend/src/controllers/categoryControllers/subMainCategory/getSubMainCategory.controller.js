import {apiError,apiResponse,asyncHandler,SubMainCategoryModel} from "../../../index.js";
const getSubMainCategory=asyncHandler(async(_,res)=>{

    const subMainCategory=await SubMainCategoryModel.find()
    res.status(200).json(new apiResponse(200,"Sub main category found successfully",subMainCategory))
})
export {getSubMainCategory}