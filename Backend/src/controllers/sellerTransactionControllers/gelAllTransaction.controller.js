import {apiError,apiResponse,asyncHandler,SellerTransactionModel} from '../../index.js'

export const getAllTransactionController=asyncHandler(async(req,res)=>{
    const {type}=req.query;
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 20;
    const sellerId=req.seller.sellerId;
    const validTypes=["order_payment","withdrawal","refund"];
    let query={sellerId,type};
    if(req.query.startDate && req.query.endDate){
        query.createdAt={$gte:new Date(req.query.startDate),$lte:new Date(req.query.endDate)};
    }
    if(req.query.filter&&req.query.filter!=="all"){
        query.status=req.query.filter;
    }
    console.log(req.query,sellerId);
    
    if(!validTypes.includes(type)){
        return res.status(400).json(new apiError(400,"Invalid transaction type"));
    }
    const totalTransactions=await SellerTransactionModel.countDocuments(query);
    const transactions=await SellerTransactionModel.find(query).skip((page-1)*limit).limit(limit);
    res.status(200).json(new apiResponse(200,"Transactions found successfully",transactions,totalTransactions));
})