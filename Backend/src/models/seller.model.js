import mongoose,{Schema} from "mongoose";


const SellerSchema = new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"UserModel",required:true},
      businessName: {
        type: String,
        default: null,
      },
      registrationNumber: {
        type: String,
        default: null,
        
      },
      taxId: {
        type: String,
        default: null,
      },
      businessAddress: {
        addressLine1: { type: String, default: null },
        addressLine2: { type: String, default: null },
        city: { type: String, default: null },
        state: { type: String, default: null },
        postalCode: { type: String, default: null },
        country: { type: String, default: null },
        phone: { type: String, default: null },
      },
      bankDetails: {
        bankName: { type: String, default: null },
        accountHolderName: { type: String, default: null },
        accountNumber: { type: String, default: null,  },
        iban: { type: String, default: null },
      },
      storeDetails: {
        storeName: { type: String, default: null,  },
        storeDescription: { type: String, default: null },
        storeLogo: { type: String, default: null },
        storeBanner: { type: String, default: null },
      },
      verification: {
        isVerified: { type: Boolean, default: false },
        verificationDate: { type: Date, default: null },
        verificationDocuments: [{ type: String }],
      },
      performanceMetrics: {
        totalProducts: { type: Number, default: 0 },
        totalSales: { type: Number, default: 0 },
        sellerRating: { type: Number, default: 0.0 },
        reviewCount: { type: Number, default: 0 },
      },
      accountStatus: {
        status: {
          type: String,
          enum: ["active", "inactive", "suspended"],
          default: "inactive",
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
      termsAgreed: {
        type: Boolean,
        default: false,
      },
      advancedFeatures: {
        preferredPaymentMethod: {
          type: String,
          enum: ["bank", "paypal", "stripe"],
          default: null,
        },
        deliveryOptions: [{ type: String }],
        subscriptionPlan: {
          type: String,
          enum: ["free", "premium", "enterprise"],
          default: "free",
        },
        supportContact: { type: String, default: null },
      },
   
    
});
export const SellerModel=mongoose.model("SellerModel",SellerSchema)

