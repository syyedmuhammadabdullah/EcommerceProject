import {asyncHandler,apiResponse,ProductQuestionModel} from "../../index.js";


const getProductQuestion=asyncHandler(async(req,res)=>{
    console.log("get product question runs", req.query);
    
    const productQuestions=await ProductQuestionModel.find({productId:req.query.productId})
    .sort({createdAt:-1}).skip(0).limit(10)
    console.log("product questions",productQuestions);
    
    res.status(200).json(new apiResponse(200,"Product questions fetched successfully",productQuestions))
})
export {getProductQuestion}