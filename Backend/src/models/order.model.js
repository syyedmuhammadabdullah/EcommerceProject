import mongoose,{Schema} from "mongoose";
import { type } from "os";


// Tracking Schema for each product
// const TrackingSchema = new mongoose.Schema({
//     status: {
//       type: String,
//       enum: ['processing', 'shipped', 'out for delivery', 'delivered',"cancelled"],
//       default: 'processing'
//     },
//     estimatedDeliveryDate: {
//       type: Date
//     },
//     trackingNumber: {
//       type: String
//     },
//     carrier: {
//       type: String
//     }
//   });
  
//   // Product Schema within an Order
//   const ProductSchema = new mongoose.Schema({
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'Product'
//     },
//     quantity: {
//       type: Number,
//       required: true
//     },
//     price: {
//       type: Number,
//       required: true
//     },
  
//     name: {
//       type: String,
//       required: true
//     },
//     image: {
//       type: String
//     },
//     sellerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'Seller'
    
//     },
//     tracking: TrackingSchema
//   });
  
//   // Order Schema
//   const OrderSchema = new mongoose.Schema({
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User'
//     },
//     products: [ProductSchema],
//     totalPrice: {
//       type: Number,
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'processing', 'completed'],
//       default: 'pending'
//     },
//     paymentMethod: {
//       type: String,
//       enum: ['cod', 'credit card', 'paypal',"stripe"],
//       required: true
//     },
//     paymentStatus: {
//       type: String,
//       enum: ['pending', 'completed', 'failed', 'cancelled', 'refunded', 'processing'],
//       default: 'pending'
//     },
//     orderId: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     totalItems: {
//       type: Number,
//     },
//     paymentId: {
//       type: String
//     },
//     shippingAddress: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'AddressModel',
//       required: true
//     },
//     billingAddress: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'AddressModel',
//       required: true
//     },
    
//   },{timestamps:true});


const ProductSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'ProductModel'
  },
  quantity: {
    type: Number,
    required: true
  },
  priceAtPurchase: {
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
  status: {
    type: String,
    enum: ['pending',"cancelled", "packed","accepted", 'rejected'],
    default: 'pending'
  },
  refundStatus: {
    type: String,
    enum: ['none', 'approved',"requested","cancelled","processing","refunded", 'rejected'],
    default: 'none'
  },
  refundAmount: {
    type: Number,
    default: 0
  },
 
},{_id:false});

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel', // Reference to the Customer model
    required: true
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'SellerModel',  // Reference to the Seller model
    required: true
  },
  products: [ProductSchema],
  totalPrice: {
    type: Number,
  },
  totalItems: {
    type: Number
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'cancelled','completed', 'processing','rejected'],
    default: 'pending'
  },
  shipmentStatus: {
    type: String,
    enum: ['pending','packed', 'shipped', 'out for delivery', 'delivered'],
    default: 'pending'
  },
  statusHistory: [
  {
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "refundRequested",
        "refundApproved",
        "refundRejected",
        "refundProcessing",
        "refundCancelled",
        "out for delivery",
        "partially refunded",
        "delivered",
        "cancelled",
        "refunded",
        "rejected",
        "packed",
        "requested",
        "approved",
      ],
      default: "pending"
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }
],
     refundStatus: {
    type: String,
    enum: ['pending', 'approved',"requested","cancelled","processing","partially refunded","refunded", 'rejected'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'credit card', 'paypal', 'stripe'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled', 'refunded', 'processing'],
    default: 'pending'
  },
  estimatedDeliveryDate: {
          type: Date
        },
        trackingNumber: {
          type: String
        },
        courier: {
          type: String
        },
  paymentId: {
    type: String
  },
  shippingAddress: {
         type:Object,
          required: true
        },
        billingAddress: {
          type:Object,
          required: true
        },
        commissionAmount: {
          type: Number,
          default: 0
        },
        commissionPercentage: {
          type: Number,
          default: 1
        },

        
},{timestamps:true});

export const OrderModel = mongoose.model("OrderModel", OrderSchema);