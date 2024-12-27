import {apiError,apiResponse,asyncHandler,ProductQuestionModel,ProductModel,OrderModel} from "../../index.js";

const getSellerProductsQuestion=asyncHandler(async(req,res)=>{
    console.log("get seller products question runs",req.seller.sellerId);
    
    const productQuestions=await ProductQuestionModel.find({sellerId:req.seller.sellerId}).populate({path:"userId",select:"fullName -_id"}).populate({path:"productId",select:"name image -_id"}).sort({createdAt:-1}).skip(0).limit(10)
    res.status(200).json(new apiResponse(200,"Product questions found successfully",productQuestions))
})
export {getSellerProductsQuestion}