import {apiError, apiResponse, asyncHandler, ProductModel} from "../../index.js";

const getOneSellerProduct = asyncHandler(async (req, res) => {
    
    if (!req.query.productId) {
        throw new apiError(400, "Product ID is required");
        
    }
    const product = await ProductModel.findById(req.query.productId)
    if (!product) {
        throw new apiError(404, "Product not found");
    }

    res.status(200)
    .json(new apiResponse(200, "Product found successfully", product));
});

export { getOneSellerProduct };