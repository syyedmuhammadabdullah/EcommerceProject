import {apiResponse,apiError,asyncHandler,ProductModel, io, NotificationModel} from "../../index.js";

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
    const message=status==="approved"?"Congratulations! Your product has been approved and is now live on our platform.":"We regret to inform you that your product has been rejected. For more information, please contact our support team.";
    // Send notification to seller about status update
    const notification =await NotificationModel.create({
        recipientModel:"Seller",
        recipient:product.seller._id,
        type:"product",
        title:"Product Status Update",
        message,
        redirect:true,
        data:{productId:product._id}
    })
    io.to(product.seller._id.toString()).emit("notification",notification);
    res.status(200).json(new apiResponse(200,"Product status updated successfully",updatedProduct));
})
export {updateProductStatus}