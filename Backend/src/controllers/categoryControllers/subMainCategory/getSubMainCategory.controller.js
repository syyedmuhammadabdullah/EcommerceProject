import {apiError,apiResponse,asyncHandler,SubMainCategoryModel} from "../../../index.js";
const getSubMainCategory=asyncHandler(async(req,res)=>{
    const search=req.query.search||""

    const subMainCategory=await SubMainCategoryModel.find({name: { $regex: search, $options: "i" }}).populate({path:"mainCategoryId",select:"name -_id"});
    res.status(200).json(new apiResponse(200,"Sub main category found successfully",subMainCategory))
})
export {getSubMainCategory}