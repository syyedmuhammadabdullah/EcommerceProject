import { apiError, apiResponse, asyncHandler, ProductModel } from "../../index.js";


const getAllProducts = asyncHandler(async (req, res) => {
    const {page=1,limit=10}=req.query
    
    if(!page || !limit){
        throw new apiError(400,"All fields are required")
    }
    const skip=(page-1)*limit
    const products = await ProductModel.find().skip(skip).limit(limit);
    if (!products) {
        throw new apiError(404, "Products not found");    
    }
    res.status(200)
    .json(new apiResponse(200, "Products found successfully",products));

});

export { getAllProducts }