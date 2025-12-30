import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number
    },
    discountPrice: {
        type: Number,
        min: 0
    },

    deliveryCharges:{
        type:Number,
        default:150
    },
    deliveryTime:{
        type:String,
        default:"5-7 business days"
    },
    currentStock: {
        type: Number
    },
   totalStock: {
        type: Number
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    warrenty:{
        type:String,
        default:"Warrenty not available"
    },
    image: {
        type: String,
    },
    imagePublic_id: {
        type: String
    },
    additionalImages: [
        {
            url: { type: String },
            public_id: { type: String }
        }
    ],
   
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    maxQuantity: {
        type: Number
    },
    totalRating: {
        type: Number,
        default: 0
    },
    averageRating:{
        type:Number,
        default:0
    },
    ratingCount:{
        type:Number,
        default:0
    },
    fiveStars: {
        type: Number,
        default: 0
    },
    fourStars: {
        type: Number,
        default: 0
    },
    threeStars: {
        type: Number,
        default: 0
    },
    twoStars: {
        type: Number,
        default: 0
    },
    oneStars: {
        type: Number,
        default: 0
    },
    lowStock: {
        type: Number,
        default: 10
    },
    stockStatus: {
        type: String,
        enum: ["in stock", "out of stock"],
        default: "in stock"
    },

    sku: {
        type: String,
        unique: true
    },

    dimensions: {
        length: { type: Number },
        width: { type: Number },
        height: { type: Number }
    },
    status: {
        type: String,
        enum: ["active", "inactive", "suspended","draft"],
        default: "active"
    },
    weight: {
        type: Number
    },
    seller: {
        type: Schema.ObjectId,
        ref: "SellerModel"
    }
}, { timestamps: true });

ProductSchema.pre('save', function (next) {
    if (!this.sku) {
        const categoryCode = this.category.slice(0, 3).toUpperCase();
        const subCategoryCode = this.subCategory.slice(0, 3).toUpperCase();
        const uniqueNumber = Date.now().toString().slice(-5);
        this.sku = `${categoryCode}-${subCategoryCode}-${uniqueNumber}`;
    }

    if (this.discountPrice) {
        this.discount = ((this.price - this.discountPrice) / this.price) * 100;
    } 
    next();
});

export const ProductModel = mongoose.model("ProductModel", ProductSchema);