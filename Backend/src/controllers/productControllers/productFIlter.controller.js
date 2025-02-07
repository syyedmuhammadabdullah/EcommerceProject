import {apiResponse,asyncHandler,ProductModel} from "../../index.js"

const productFilter=asyncHandler(async(req,res)=>{

    const { category, search,minPrice, maxPrice, rating, inStock, sortBy, page = 1, limit = 10 } = req.query;
    console.log(search,category,minPrice,maxPrice,rating,inStock,sortBy,page,limit);
    
    const pipeline = [];

    // Match Stage (Add only if filters are provided)
    const match = {};
  
    if (category) match.category = { $regex: category, $options: "i" };
 // Search Stage
 if (search) {
  match.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } }
  ];
}
    if (minPrice || maxPrice) match.price = { ...(minPrice && { $gte: +minPrice }), ...(maxPrice && { $lte: +maxPrice }) };
    if (rating>0) match.rating = { $gte: +rating };
    if (inStock) match.stock = { $gt: 0 };
    if (Object.keys(match).length) {
      pipeline.push({ $match: match });
    }

    // Sort Stage (Add only if sorting is requested)
    if (sortBy) {
      const sort = {};
      if (sortBy === 'priceAsc') sort.price = 1;
      if (sortBy === 'priceDesc') sort.price = -1;
      if (sortBy === 'rating') sort.rating = -1;
      pipeline.push({ $sort: sort });
    }

   
 

    // Pagination Stage
    pipeline.push({ $skip: (page - 1) * limit });
    pipeline.push({ $limit: +limit });

    // Projection Stage
    pipeline.push({
      $project: {
        name: 1,
        price: 1,
        image: 1,
        discountPrice: 1,
        category: 1,
        averageRating: 1,
        rating: 1,
        stock: 1,
      },
    });

    const products = await ProductModel.aggregate(pipeline);

    res.status(200).json(new apiResponse(200, "Products found successfully", products));
  
})

export {productFilter}