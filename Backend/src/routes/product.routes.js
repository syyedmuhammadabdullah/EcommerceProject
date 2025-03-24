import { Router } from "express";
import { getAllProducts, getOneProduct,getAllSellerProducts,getOneSellerProduct, productFilter,createProduct,uploadMiddleware, authMiddleware,updateProductDetails, deleteProduct } from "../index.js";
const productRouter = Router();

productRouter.get("/getProducts", getAllProducts)
productRouter.get("/getOneProduct", getOneProduct)
productRouter.post("/createProduct",authMiddleware,uploadMiddleware.any(), createProduct)
productRouter.get("/productFilter", productFilter)
productRouter.get("/getAllSellerProducts",authMiddleware,getAllSellerProducts)
productRouter.post("/updateProductDetails",authMiddleware,uploadMiddleware.any(),updateProductDetails)
productRouter.post("/deleteProduct",deleteProduct)
productRouter.get("/getOneSellerProduct",getOneSellerProduct)


export { productRouter }