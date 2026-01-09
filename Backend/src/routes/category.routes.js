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



const categoryRouter=Router()

categoryRouter.get("/getMainCategories",getMainCategory);
categoryRouter.post("/createMainCategory",createMainCategory);
categoryRouter.post("/updateMainCategory",updateMainCategory);
categoryRouter.delete("/deleteMainCategory/:id",deleteMainCategory);



categoryRouter.get("/getSubCategories",getSubMainCategory);
categoryRouter.post("/createSubCategory",createSubMainCategory);
categoryRouter.post("/updateSubCategory",updateSubMainCategory);
categoryRouter.delete("/deleteSubCategory/:id",deleteSubMainCategory);

export {categoryRouter}