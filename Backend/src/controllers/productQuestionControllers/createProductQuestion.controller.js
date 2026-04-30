import {asyncHandler,apiError,apiResponse,ProductQuestionModel, io, NotificationModel} from "../../index.js";

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
    const notificationMessage = `Your product has received a new question: "${question}". Please respond to the customer as soon as possible.`;
    const notification = await NotificationModel.create({
        recipientModel: "Seller",
        recipient: sellerId,
        type: "question",
        title: "New Product Question",
        message: notificationMessage,
        redirect: true,
        data: {
            productId,
            questionId: productQuestion._id,
        },
    });
    io.to(sellerId.toString()).emit("notification", notification);
    const productQuestions=await ProductQuestionModel.find({productId}).sort({createdAt:-1}).skip(0).limit(10) 
    res.status(201).json(new apiResponse(201,"Product question created successfully",productQuestions))
})
export {createProductQuestion}