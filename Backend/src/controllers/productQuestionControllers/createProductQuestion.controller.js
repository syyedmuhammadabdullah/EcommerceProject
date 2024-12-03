import {asyncHandler,apiError,apiResponse,ProductQuestionModel} from "../../index.js";

const createProductQuestion=asyncHandler(async(req,res)=>{
    const {productId,question}=req.body;
    console.log(productId,question);
    
    if(!productId || !question){
        throw new apiError(400,"All fields are required")
    }
    const productQuestion=await ProductQuestionModel.create({
        productId,
        question,
        userId:req.user._id
    })
    const productQuestions=await ProductQuestionModel.find({productId}).sort({createdAt:-1}).skip(0).limit(10) 
    res.status(201).json(new apiResponse(201,"Product question created successfully",productQuestions))
})
export {createProductQuestion}