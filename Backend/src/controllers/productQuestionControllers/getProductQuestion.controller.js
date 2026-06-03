import {asyncHandler,apiResponse,ProductQuestionModel} from "../../index.js";


const getProductQuestion=asyncHandler(async(req,res)=>{
    const page=parseInt(req.query.page)||1
    const limit=parseInt(req.query.limit)||5
    
    const productQuestions=await ProductQuestionModel.find({productId:req.query.productId})
    .populate({path:"userId",select:"fullName -_id"})
    .sort({createdAt:-1}).skip((page - 1) * limit).limit(limit)
    const total=await ProductQuestionModel.countDocuments({productId:req.query.productId})
    
    res.status(200).json(new apiResponse(200,"Product questions fetched successfully",productQuestions,total))
})
export {getProductQuestion}