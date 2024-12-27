import {asyncHandler,apiError,apiResponse,ProductQuestionModel} from "../../index.js";


const updateAnswerToProductQuestion=asyncHandler(async(req,res)=>{
    const {productQuestionId,answer}=req.body;
    if(!productQuestionId || !answer){
        throw new apiError(400,"All fields are required")
    }
   const productQuestion= await ProductQuestionModel.findByIdAndUpdate({_id:productQuestionId},{answer:answer},{new:true}).populate({path:"userId",select:"fullName -_id"}).populate({path:"productId",select:"name image -_id"})
    if(!productQuestion){
        throw new apiError(404,"Product question not found")
    }
    res.status(200).json(new apiResponse(200,"Product question updated successfully",productQuestion))
})
export {updateAnswerToProductQuestion}