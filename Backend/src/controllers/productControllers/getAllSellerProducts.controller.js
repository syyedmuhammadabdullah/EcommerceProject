import e from "express";
import {apiError,apiResponse,asyncHandler,ProductModel} from "../../index.js";
import mongoose from "mongoose";

const getAllSellerProducts=asyncHandler(async(req,res)=>{
    let seller;
    if (req.query.sellerId) {
        if (!mongoose.Types.ObjectId.isValid(req.query.sellerId)) {
            throw new apiError(400, "Invalid seller id");
        }
        seller=new mongoose.Types.ObjectId(req.query.sellerId);
    }else{
        seller=req.seller.sellerId
    }
    
    let query={
        seller,
    };
    if (req.query.filter && req.query.filter !== "all" && req.query.filter !== "undefined" && req.query.filter !== "null") {

        if (req.query.filter ==="out of stock" || req.query.filter ==="in stock") {
            query.stockStatus = req.query.filter;  // Apply the filter to your query      
        }

        if (req.query.filter ==="active" || req.query.filter ==="inactive") {
            
            query.status=req.query.filter;  // Apply the filter to your query
        }
        
      
  };
  
  
    const totalProducts=await ProductModel.aggregate([
        {
            $match:{seller}
        },
        {
            $count:"total"
        }
    ])
    const total=totalProducts[0]?.total
    
    const products=await ProductModel.aggregate([
        {
            $match:query
        },
        {
            $match: req.query.search ? {
                name: { $regex: req.query.search, $options: "i" }
            } : {}
        },
        
        {
            $sort:{createdAt:-1}
        },
        {
            $project:{
                _id:1,
                stockStatus:1,
                category:1,
                price:1,
                name:1,
                status:1,
                image:1,
                currentStock:1,
                totalStock:1
            }
        },

        {
            $skip:(req.query.page-1)*req.query.limit
        },
        {
            $limit:parseInt(req.query.limit)
        }
    ])
    if(!products){
        throw new apiError(404,"Products not found");
        }

    
    res.status(200).json(new apiResponse(200,"Products found successfully",{products,sellerId:seller},total))
})

export {getAllSellerProducts}