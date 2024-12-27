import {asyncHandler,apiError,apiResponse,ProductQuestionModel} from "../../index.js";

const createProductQuestion=asyncHandler(async(req,res)=>{
    const {productId,question,sellerId}=req.body;
    console.log(req.body);
    
    if(!productId || !question || !sellerId){
        throw new apiError(400,"All fields are required")
    }
    const productQuestion=await ProductQuestionModel.create({
        productId,
        question,
        sellerId,
        userId:req.user._id,
        userName:req.user.fullName
    })
    const productQuestions=await ProductQuestionModel.find({productId}).sort({createdAt:-1}).skip(0).limit(10) 
    res.status(201).json(new apiResponse(201,"Product question created successfully",productQuestions))
})
export {createProductQuestion}