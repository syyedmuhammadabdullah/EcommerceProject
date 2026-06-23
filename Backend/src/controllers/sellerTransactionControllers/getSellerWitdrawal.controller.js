import {apiError,apiResponse,asyncHandler,SellerWithdrawalModel} from '../../index.js'

const getSellerWithdrawal=asyncHandler(async(req,res)=>{
    const sellerId=req.seller.sellerId;
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 10;
    const filter=req.query.filter;
    let query={
        sellerId,
    }
    if (filter!=="all") {
        query.status=filter
    }
    const total=await SellerWithdrawalModel.countDocuments(query)
    const sellerWithdrawal=await SellerWithdrawalModel.find(query).skip((page-1)*limit).limit(limit).sort({createdAt:-1});
    if(!sellerWithdrawal){
        throw new apiError(400,"Withdrawal not found");
    }
    res.status(200).json(new apiResponse(200,"Withdrawal found successfully",sellerWithdrawal,total));
})
export {getSellerWithdrawal}