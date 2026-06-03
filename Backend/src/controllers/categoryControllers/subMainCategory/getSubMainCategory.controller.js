import {apiError,apiResponse,asyncHandler,SubMainCategoryModel} from "../../../index.js";
const getSubMainCategory=asyncHandler(async(req,res)=>{
    const search=req.query.search||""
    const page=parseInt(req.query.page)||1
    const limit=parseInt(req.query.limit)||10

    const subMainCategory=await SubMainCategoryModel.find({name: { $regex: search, $options: "i" }}).populate({path:"mainCategoryId",select:"name _id"}).skip((page - 1) * limit).limit(limit);
    const totalSubCategories=await SubMainCategoryModel.countDocuments()
    res.status(200).json(new apiResponse(200,"Sub main category found successfully",subMainCategory,totalSubCategories))
})
export {getSubMainCategory}