import {apiError,apiResponse,asyncHandler,CouponModel,OrderModel} from "../../index.js";

export const applyCoupon =  ayncHandler(async (req, res) => {

    const { code, cartTotal, userId, items } = req.body;

    const coupon = await CouponModel.findOne({ code: code.trim() });

    if (!coupon) {
     throw apiError( 404, "Coupon not found");
    }

    // 1. STATUS CHECK
    if (coupon.status !== "active") {
     throw apiError( 400, "Coupon is not active");
    }

    // 2. DATE VALIDATION
    const now = new Date();
    if (now < coupon.startDate || now > coupon.endDate) {
      throw apiError( 400, "Coupon expired or not started yet");
    }

    // 3. MIN SPEND CHECK
    if (coupon.minimumSpend && cartTotal < coupon.minimumSpend) {
      throw apiError( 400, `Minimum spend is ${coupon.minimumSpend}`);
    }

    // 4. MAX SPEND CHECK
    if (coupon.maximumSpend && cartTotal > coupon.maximumSpend) {
      throw apiError( 400, `Maximum spend is ${coupon.maximumSpend}`);
    }

    // 5. USER USAGE LIMIT CHECK
    const userUsageCount = await OrderModel.countDocuments({
      userId,
      couponCode: code,
    });

    if (coupon.userUsageLimit && userUsageCount >= coupon.userUsageLimit) {
      throw apiError( 400, "You have already used this coupon the maximum number of times");
    }

    // 6. TOTAL USAGE LIMIT CHECK
    const totalUsage = await OrderModel.countDocuments({
      couponCode: code,
    });

    if (
      coupon.totalUsageLimit &&
      totalUsage >= coupon.totalUsageLimit
    ) {
      throw apiError( 400, "Coupon usage limit reached");
    }

    // 7. CALCULATE DISCOUNT
    let discount = 0;

    if (coupon.discountType === "percentage") {
      discount = (cartTotal * coupon.discountValue) / 100;

      // apply max discount cap
      if (coupon.maximumDiscount && discount > coupon.maximumDiscount) {
        discount = coupon.maximumDiscount;
      }
    } else {
      // fixed price discount
      discount = coupon.discountValue;
    }

    // ensure discount not more than cart
    if (discount > cartTotal) discount = cartTotal;

    const finalTotal = cartTotal - discount;

     res.status(200).json(new apiResponse("Coupon applied successfully",{
        originalTotal: cartTotal,
        discount,
        finalTotal,
    }));
  });
  