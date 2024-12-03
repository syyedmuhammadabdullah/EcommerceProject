import moongoose, { Schema } from "mongoose";

const MainCategorySchema = new Schema({
    name: { type: String, required: true },
    // image: { type: String, required: true },
    // status: { type: Boolean, default: true },
});
export const MainCategoryModel = moongoose.model("MainCategoryModel", MainCategorySchema);