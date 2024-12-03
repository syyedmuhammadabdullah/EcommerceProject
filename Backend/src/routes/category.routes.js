import {Router} from "express";
import{
    createMainCategory,
    createSubMainCategory,
    deleteMainCategory,
    getMainCategory,
    getSubMainCategory,
    updateMainCategory,
    updateSubMainCategory,
    deleteSubMainCategory
}from "../index.js";



const mainCategoryRouter=Router()

mainCategoryRouter.get("/getAll",getMainCategory);
mainCategoryRouter.post("/createMainCategory",createMainCategory);
mainCategoryRouter.post("/updateMainCategory",updateMainCategory);
mainCategoryRouter.post("/deleteMainCategory",deleteMainCategory);

export {mainCategoryRouter}

const subMainCategoryRouter=Router()

subMainCategoryRouter.get("/getAll",getSubMainCategory);
subMainCategoryRouter.post("/createSubMainCategory",createSubMainCategory);
subMainCategoryRouter.post("/updateSubMainCategory",updateSubMainCategory);
subMainCategoryRouter.post("/deleteSubMainCategory",deleteSubMainCategory);

export {subMainCategoryRouter}