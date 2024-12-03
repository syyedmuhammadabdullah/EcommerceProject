import mongoose from "mongoose";

const SubMainCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    mainCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "MainCategoryModel" },
    // image: { type: String, required: true },
    // status: { type: Boolean, default: true },
});
export const SubMainCategoryModel = mongoose.model("SubMainCategoryModel", SubMainCategorySchema);