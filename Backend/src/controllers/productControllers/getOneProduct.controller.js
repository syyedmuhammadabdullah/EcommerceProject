import { apiError, apiResponse, asyncHandler, ProductModel } from "../../index.js";


const getOneProduct = asyncHandler(async (req, res) => {
    console.log("get product runs",req.query);
    
    const product = await ProductModel.findById(req.query.productId).populate({path:"seller",select:"storeDetails -_id"});
    if (!product) {
        throw new apiError(404, "Product not found");
    }

    res.status(200)
    .json(new apiResponse(200, "Product found successfully", product));

});
export { getOneProduct }