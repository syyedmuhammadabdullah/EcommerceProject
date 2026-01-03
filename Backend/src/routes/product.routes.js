import { Router } from "express";
import { getAllProducts,updateProductStatus, getOneProduct,getAllSellerProducts,getOneSellerProduct, productFilter,createProduct,uploadMiddleware, authMiddleware,updateProductDetails, deleteProduct, roleCheckMiddleware, getAllProductsForAdmin } from "../index.js";
const productRouter = Router();

productRouter.get("/getProducts", getAllProducts)
productRouter.get("/getOneProduct", getOneProduct)
productRouter.post("/createProduct",authMiddleware,roleCheckMiddleware("seller"),uploadMiddleware.any(), createProduct)
productRouter.get("/productFilter", productFilter)
productRouter.get("/getAllSellerProducts",authMiddleware,roleCheckMiddleware("seller","admin"),getAllSellerProducts)
productRouter.post("/updateProductDetails",authMiddleware,roleCheckMiddleware("seller"),uploadMiddleware.any(),updateProductDetails)
productRouter.post("/deleteProduct",authMiddleware,roleCheckMiddleware("seller"), deleteProduct)
productRouter.get("/getOneSellerProduct",getOneSellerProduct)
productRouter.post("/updateProductStatus",authMiddleware,roleCheckMiddleware("seller","admin"),updateProductStatus)
productRouter.get("/getAllProducts",authMiddleware,roleCheckMiddleware("admin"),getAllProductsForAdmin)
export { productRouter }