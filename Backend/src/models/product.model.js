import mongoose, { Schema } from "mongoose";
// import { faker } from '@faker-js/faker';




const AttributeSchema = new Schema({
    attributeName: {
        type: String,
        // required: true
    },
    attributeValue: {
        type: String,
        // required: true
    }
});

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
        required: true
    },
    imagePublic_id: {
        type: String
    },
    additionalImages: [
        {
            url: { type: String, required: true },
            public_id: { type: String }
        }
    ],
    tags: {
        type: [String]
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
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
    stockStatus: {
        type: String,
        enum: ["in stock", "out of stock"],
        default: "in stock"
    },

    attribute: [AttributeSchema],
    
    sku: {
        type: String,
        unique: true
    },

    dimensions: {
        length: { type: Number },
        width: { type: Number },
        height: { type: Number }
    },
    weight: {
        type: Number
    },
    variants: {
        type: [String]
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

    if (this.discount) {
        this.discountPrice = this.price - this.discount;
    } else {
        this.discountPrice = this.price;
    }
    next();
});

export const ProductModel = mongoose.model("ProductModel", ProductSchema);
// const createDummyProduct = async () => {
//     const numOfProducts = 1000; // Number of products to generate

//     for (let i = 0; i < numOfProducts; i++) {
//         const dummyProduct = new ProductModel({
//             name: faker.commerce.productName(),
//             price: parseFloat(faker.commerce.price(100, 1000)),
//             unitPrice: parseFloat(faker.commerce.price(100, 1000)),
//             discount: faker.datatype.number({ min: 0, max: 100 }),
//             discountPrice: parseFloat(faker.commerce.price(50, 900)),
//             brand: faker.company.name(),
//             description: faker.commerce.productDescription(),
//             image: faker.image.imageUrl(),
//             imagePublic_id: faker.datatype.uuid(),
//             additionalImages: Array.from({ length: 3 }, () => ({
//                 url: faker.image.imageUrl(),
//                 public_id: faker.datatype.uuid()
//             })),
//             tags: faker.lorem.words(3).split(' '),
//             category: faker.commerce.department(),
//             subCategory: faker.commerce.productAdjective(),
//             quantity: faker.datatype.number({ min: 1, max: 100 }),
//             rating: faker.datatype.float({ min: 1, max: 5 }),
//             reviews: Array.from({ length: 2 }, () => ({
//                 user: new mongoose.Types.ObjectId(), // Assuming you have a user ID
//                 rating: faker.datatype.float({ min: 1, max: 5 }),
//                 comment: faker.lorem.sentence(),
//                 createdAt: faker.date.recent()
//             })),
//             stockStatus: faker.helpers.arrayElement(['in stock', 'out of stock']),
//             attribute: [
//                 {
//                     attributeName: faker.commerce.productMaterial(),
//                     attributeValues: Array.from({ length: faker.datatype.number({ min: 1, max: 3 }) }, () => ({
//                         value: faker.commerce.productAdjective(),
//                         price: faker.datatype.number({ min: 10, max: 200 })
//                     }))
//                 }
//             ],
//             sku: faker.helpers.slugify(faker.commerce.productName()).toUpperCase(),
//             dimensions: {
//                 length: faker.datatype.float({ min: 10, max: 100 }),
//                 width: faker.datatype.float({ min: 10, max: 100 }),
//                 height: faker.datatype.float({ min: 10, max: 100 })
//             },
//             weight: faker.datatype.float({ min: 1, max: 10 }),
//             variants: faker.lorem.words(3).split(' '),
//             seller: new mongoose.Types.ObjectId() // Assuming you have a seller ID
//         });

//         await dummyProduct.save();
//     }

//     console.log(`${numOfProducts} dummy products created.`);
// };
// // Call the function to create a dummy product
// createDummyProduct().catch(console.error);