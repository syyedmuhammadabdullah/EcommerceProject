import {asyncHandler,apiError,apiResponse,ProductQuestionModel} from "../../index.js";


const updateAnswerToProductQuestion=asyncHandler(async(req,res)=>{
    const {productQuestionId,answer}=req.body;
    if(!productQuestionId || !answer){
        throw new apiError(400,"All fields are required")
    }
    const productQuestion=await ProductQuestionModel.findById(productQuestionId)
    if(!productQuestion){
        throw new apiError(404,"Product question not found")
    }
    productQuestion.answer=answer
    await productQuestion.save()
    res.status(200).json(new apiResponse(200,"Product question updated successfully",productQuestion))
})
export {updateAnswerToProductQuestion}