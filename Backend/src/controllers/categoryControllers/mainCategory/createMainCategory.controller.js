import {apiError,apiResponse,asyncHandler,MainCategoryModel} from "../../../index.js";

const createMainCategory=asyncHandler(async(req,res)=>{
    const {name}=req.body;
    if(!name){
        throw new apiError(400,"Name is required");
    }
    const mainCategory=await MainCategoryModel.create({
        name
    })
    res.status(201).json(new apiResponse(201,"Main category created successfully",mainCategory))
})

export {createMainCategory}