import {asyncHandler,apiError,apiResponse,ProductQuestionModel} from "../../index.js";


const deleteProductQuestion=asyncHandler(async(req,res)=>{	
    const {productQuestionId}=req.body;
    if(!productQuestionId){
        throw new apiError(400,"Product question id is required");
    }

    await ProductQuestionModel.findByIdAndDelete(productQuestionId)
    res.status(200).json(new apiResponse(200,"Product question deleted successfully",null))
})

export {deleteProductQuestion}