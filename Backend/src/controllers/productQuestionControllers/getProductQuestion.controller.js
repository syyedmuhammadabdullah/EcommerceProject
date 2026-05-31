import {asyncHandler,apiResponse,ProductQuestionModel} from "../../index.js";


const getProductQuestion=asyncHandler(async(req,res)=>{
    console.log("get product question runs", req.query);
    const page=parseInt(req.query.page)||1
    const limit=parseInt(req.query.limit)||3
    
    const productQuestions=await ProductQuestionModel.find({productId:req.query.productId})
    .populate({path:"userId",select:"fullName -_id"})
    .sort({createdAt:-1}).skip((page - 1) * limit).limit(limit)
    console.log("product questions",productQuestions);
    
    res.status(200).json(new apiResponse(200,"Product questions fetched successfully",productQuestions))
})
export {getProductQuestion}