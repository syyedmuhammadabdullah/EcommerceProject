import {apiResponse,apiError,asyncHandler,ProductModel} from "../../index.js";

const updateProductStatus=asyncHandler(async(req,res)=>{
    const {productId,status}=req.body;

    if(!productId || !status){
        throw new apiError(400,"All fields are required");
    }
    const product=await ProductModel.findById(productId).populate({path:"seller",select:"storeDetails.storeName"});
    if(!product){
        throw new apiError(400,"Product not found");
    }
    if(product.status===status){
        throw new apiError(400,"Product status already updated");
    }
    if (status==="suspended" && !req.admin) {
        throw new apiError(400, "Only admin can suspend a product");
    }
    product.status=status;
    await product.save();
    const updatedProduct={
        name:product.name,
        status:product.status,
        price:product.price,
        quantity:product.quantity,
        image:product.image,
        currentStock:product.currentStock,
        category:product.category,
        _id:product._id,
        seller:product.seller,
        
    }
    res.status(200).json(new apiResponse(200,"Product status updated successfully",updatedProduct));
})
export {updateProductStatus}