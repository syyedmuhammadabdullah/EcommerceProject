import {apiError,apiResponse,asyncHandler,ProductModel} from "../../index.js";

const getAllSellerProducts=asyncHandler(async(req,res)=>{
    let query={
        seller:req.seller.sellerId,
    };
    if (req.query.filter && req.query.filter !== "all" && req.query.filter !== "undefined" && req.query.filter !== "null") {

        if (req.query.filter ==="out of stock" || req.query.filter ==="in stock") {
            query.stockStatus = req.query.filter;  // Apply the filter to your query      
        }

        if (req.query.filter ==="active" || req.query.filter ==="inactive") {
            
            query.status=req.query.filter;  // Apply the filter to your query
        }
        
      
  };
  console.log(query);
  
  
    const totalProducts=await ProductModel.aggregate([
        {
            $match:{seller:req.seller.sellerId}
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
            $skip:(req.query.page-1)*req.query.limit
        },
        {
            $limit:parseInt(req.query.limit)
        }
    ])
    if(!products){
        throw new apiError(404,"Products not found");
        }
    if (!products) {
        throw new apiError(404,"Products not found");
    }
    res.status(200).json(new apiResponse(200,"Products found successfully",products,total))
})

export {getAllSellerProducts}