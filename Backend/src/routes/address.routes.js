import { Router } from "express";
import { createAddress,deleteAddress,getSingleAddress,getAllAddress,editAddress,roleCheckMiddleware, authMiddleware, changeDefaultAddress}from "../index.js"
const addressRouter=Router();

addressRouter.post("/createAddress",authMiddleware,roleCheckMiddleware("user"), createAddress)
addressRouter.post("/updateAddress",authMiddleware,roleCheckMiddleware("user"),editAddress )
addressRouter.post("/deleteAddress",authMiddleware,roleCheckMiddleware("user"),deleteAddress )
addressRouter.get("/getAllAddress",authMiddleware,roleCheckMiddleware("user"),getAllAddress )
addressRouter.get("/getSingleAddress",authMiddleware,roleCheckMiddleware("user"),getSingleAddress)
addressRouter.post("/changeDefaultAddress",authMiddleware,roleCheckMiddleware("user"),changeDefaultAddress)
export { addressRouter }