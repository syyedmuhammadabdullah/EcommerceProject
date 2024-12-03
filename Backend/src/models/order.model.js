import mongoose from "mongoose";


// Tracking Schema for each product
const TrackingSchema = new mongoose.Schema({
    status: {
      type: String,
      enum: ['processing', 'shipped', 'out for delivery', 'delivered',"cancelled"],
      default: 'processing'
    },
    estimatedDeliveryDate: {
      type: Date
    },
    trackingNumber: {
      type: String
    },
    carrier: {
      type: String
    }
  });
  
  // Product Schema within an Order
  const ProductSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
  
    name: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Seller'
    
    },
    tracking: TrackingSchema
  });
  
  // Order Schema
  const OrderSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    products: [ProductSchema],
    totalPrice: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed'],
      default: 'pending'
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'credit card', 'paypal',"stripe"],
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'cancelled', 'refunded', 'processing'],
      default: 'pending'
    },
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    totalItems: {
      type: Number,
    },
    paymentId: {
      type: String
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AddressModel',
      required: true
    },
    billingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AddressModel',
      required: true
    },
    
  },{timestamps:true});

  






// const OrderSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
//     products: {
//         type: Array,
//         orderId: { type: String, unique: true ,required:true},
//         status: { type: String, default: "pending" },


       
//     },
//     totalPrice: { type: Number, default: 0 },
//     paymentMethod: { type: String, default: "cash on delivery" },
//     totalItems: { type: Number, default: 0 },
//     shippingAddress: {
//        type: mongoose.Schema.Types.ObjectId,
//        ref: "AddressModel"
//     },
//     billingAddress: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "AddressModel"
//      },
// },
//     { timestamps: true });

export const OrderModel = mongoose.model("OrderModel", OrderSchema);