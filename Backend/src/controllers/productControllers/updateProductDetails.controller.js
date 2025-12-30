import e from "express";
import { apiError, apiResponse, asyncHandler, deleteOnCloudinary, ProductModel,transformAttributes, uploadOnCloudinary } from "../../index.js";

const convertImage=(req)=>{
    // assume req.body me aa raha hai:
const { 
  'additionalImages[][url]': urls = [], 
  'additionalImages[][public_id]': publicIds = [], 
  'additionalImages[][_id]': ids = [] 
} = req.body;

// array of objects banate hain
const additionalImages = [];

for (let i = 0; i < urls.length; i++) {
  additionalImages.push({
    url: urls[i],
    public_id: publicIds[i],
    _id: ids[i]
  });
}
return additionalImages;
// ab additionalImages ready hai DB me save karne ke liye
// console.log(additionalImages);
/*
[
  { url: "...", public_id: "...", _id: "..." },
  { url: "...", public_id: "...", _id: "..." },
  ...
]
*/
}
// woxmoz3ttknlagvdifg2

const updateProductDetails = asyncHandler(async (req, res) => {

    const productId=req.body._id;
    if (!productId) {
        throw new apiError(400, "Product ID is required");
    }

    const product= await ProductModel.findById(productId);
    
    if (!product) {
        throw new apiError(404, "Product not found");
    }
    const oldImages=  convertImage(req).map(image=>image.public_id);
    const productImages=product.additionalImages.map(image=>image.public_id);

    const discardedImages=productImages.filter(image=>!oldImages.includes(image));
    if(!req.body.image){
        discardedImages.push(product.imagePublic_id);
    }
    const pendingPromises = discardedImages.map(image => deleteOnCloudinary(image));
    const deletedImages= await Promise.all(pendingPromises);
    if (!deletedImages) {
        throw new apiError(500, "Failed to delete images");
    }
    product.additionalImages=product.additionalImages.filter(image=>!discardedImages.includes(image.public_id));
    
    const newImages = req.files

    let pendingImages = newImages?.map(image => uploadOnCloudinary(image.path));
    const uploadedImages = await Promise.all(pendingImages);
    
    if (!uploadedImages) {
        throw new apiError(500, "Failed to upload images");
    }

    let mainImage;
    if (!req.body.image) {
        mainImage = uploadedImages[0];
    }
    let additionalImages;
    if (!req.body.image) {
        additionalImages = uploadedImages.slice(1);
    }else {
        additionalImages = uploadedImages
    }
      const productData={
            
            ...req.body,
            unitPrice:req.body.discountPrice? req.body.discountPrice : req.body.price,
            totalStock:req.body.currentStock,
            image:mainImage? mainImage.secure_url : product.image,
            imagePublic_id:mainImage?.public_id,
            additionalImages:[
                             ...(product.additionalImages || []),       // existing images
                                ...(additionalImages?.map(image => ({
                                   url: image.secure_url,
                                      public_id: image.public_id
                                       })) || []) ],
            seller:req.seller.sellerId,
            dimensions: {
                length: req.body.length,
                width: req.body.width,
                height: req.body.height
            },
           
        }
   product.set(productData);
   await product.save();
    res.status(200)
    .json(new apiResponse(200,"The product has been updated successfully",product ))

});


export { updateProductDetails };