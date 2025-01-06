import { apiError, apiResponse, asyncHandler, ProductModel, uploadOnCloudinary, deleteOnCloudinary,transformAttributes } from "../../index.js";

const createProduct = asyncHandler(async (req, res) => {
console.log("create product runs",req.seller.sellerId);
const transformedAttributes = transformAttributes(req.body);


    const images = req.files;

    let pendingPromises = images?.map(image => uploadOnCloudinary(image.path));

    const uploadedImages = await Promise.all(pendingPromises);

        console.log("uploaded images",uploadedImages);
        const mainImage=uploadedImages[0];
        const additionalImages=uploadedImages?.slice(1);
        const productData={
            ...req.body,
            totalStock:req.body.currentStock,
            image:mainImage.secure_url,
            imagePublic_id:mainImage?.public_id,
            additionalImages:additionalImages?.map(image => {return {url:image.secure_url,public_id:image.public_id}}),
            seller:req.seller.sellerId,
            attributes:[...transformedAttributes]

        }
  
        try {
            
            const product = await ProductModel.create(productData);
            console.log("product created",product);
            
    
        } catch (error) {
            console.log("error creating product",error);
            
            
        }
        if (!product) {
            const pendingPromises = uploadedImages?.map(image => deleteOnCloudinary(image.public_id));
           const deletedImages= await Promise.all(pendingPromises);
           if (!deletedImages) {
               throw new apiError(500, "Failed to delete images");            
           }
            throw new apiError(500, "Failed to create product"); 
        }

        res.status(200).json(new apiResponse(200, "Product created successfully", product));
    

});
export { createProduct };
