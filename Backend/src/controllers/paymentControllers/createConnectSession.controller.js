
import {SellerModel,apiError,apiResponse,asyncHandler,stripe} from "../../index.js"
export const createConnectSession = async (req, res) => {
  try {
    const userId = req.seller.sellerId;
    const seller=await SellerModel.findById(userId);

     let account;
     let isExists;
    // 1. Create Stripe Express 
    if (!seller.stripeAccountId) {
      const create = await stripe.accounts.create({
    type: "express",
    country: "PK",
    tos_acceptance :{
    service_agreement: "recipient",
  },    
  capabilities:{
    
    transfers: {
      requested: true,
    },
  },
    email: req.seller.email,
  });
     account=create;
    }else{
      const exists=await stripe.accounts.retrieve(seller.stripeAccountId);
      isExists=exists
    }

  
    

    // save in DB (important)
    if (!isExists) {
      seller.stripeAccountId = account.id;
      await seller.save();
    }
    console.log("account updated ",isExists);
    // 2. Create Account Session (for embedded UI)
    const session = await stripe.accountSessions.create({
      account:isExists?isExists.id: account.id,
      components: {
        account_onboarding: {
      enabled: true,
    },

      },
    });
    console.log("the session is ",session);
    

    res.json(new apiResponse(200, "Connect session created successfully", session.client_secret));

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Stripe error" });
  }
};