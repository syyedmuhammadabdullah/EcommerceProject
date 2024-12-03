import {apiError,apiResponse,asyncHandler,SubMainCategoryModel} from "../../../index.js";

const createSubMainCategory=asyncHandler(async(req,res)=>{
    const {mainCategoryId,name}=req.body;
    if(!mainCategoryId || !name){
        throw new apiError(400,"All fields are required")
    }
    const subMainCategory=await SubMainCategoryModel.create({
        mainCategoryId,
        name
    })
    res.status(201).json(new apiResponse(201,"Sub main category created successfully",subMainCategory))
})
export {createSubMainCategory}