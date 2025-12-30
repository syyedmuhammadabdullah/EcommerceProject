import {apiError,apiResponse,asyncHandler,ProductQuestionModel,ProductModel,OrderModel} from "../../index.js";

const getSellerProductsQuestion = asyncHandler(async (req, res) => {
  const { filter, search } = req.query;

  let query = {
    sellerId: req.seller.sellerId,
  };

  // ✅ Reply / Not Reply filter
  if (filter === "replied") {
    query.answer = { $exists: true, $ne: "" };
  } 
  else if (filter === "unreplied") {
    query.$or = [
      { answer: { $exists: false } },
      { answer: "" }
    ];
  }

  const productQuestions = await ProductQuestionModel.aggregate([
    { $match: query },

    // ✅ Search
    ...(search ? [{
      $match: {
        question: { $regex: search, $options: "i" }
      }
    }] : []),

    // ✅ User lookup
    {
      $lookup: {
        from: "usermodels",
        localField: "userId",
        foreignField: "_id",
        as: "userId",
      },
    },
    { $unwind: "$userId" },

    // ✅ Product lookup
    {
      $lookup: {
        from: "productmodels",
        localField: "productId",
        foreignField: "_id",
        as: "productId",
      },
    },
    { $unwind: "$productId" },

    // ✅ Final projection (ONLY REQUIRED DATA)
    {
      $project: {
        question: 1,
        answer: 1,
        createdAt: 1,

        userId: {
          fullName: "$userId.fullName"
        },

        productId: {
          name: "$productId.name",
          image: "$productId.image"
        }
      }
    },

    { $sort: { createdAt: -1 } }
  ]);

  res.status(200).json(
    new apiResponse(200, "Product questions found successfully", productQuestions)
  );
});

export {getSellerProductsQuestion}