import {apiError,apiResponse,asyncHandler,CouponModel} from "../../index.js";

export const createCoupon =  ayncHandler(async (req, res) => {
    const {
        code,
        discountScope,
        discountType,
        discountValue,
        minimumSpend,
        maximumSpend,
        maximumDiscount,
        startDate,
        endDate,
        userUsageLimit,
        totalUsageLimit,
        status,
    } = req.body;
    

    const coupon = await CouponModel.create({
        code,
        discountScope,
        discountType,
        discountValue,
        minimumSpend,
        maximumSpend,
        maximumDiscount,
        startDate,
        endDate,
        userUsageLimit,
        totalUsageLimit,
        status,
    });

    res.status(200).json(new apiResponse("Coupon created successfully",coupon));
});