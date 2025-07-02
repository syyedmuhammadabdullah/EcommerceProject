import {apiError,apiResponse,asyncHandler,CartModel,CartItemModel, ProductModel} from "../../index.js";

const addItemToCart = asyncHandler(async (req, res) => {
    const { productId, quantity, userId, unitPrice, sellerId } = req.body;
  
    if (!productId || !quantity || !userId || !unitPrice || !sellerId) {
      throw new apiError(400, "All fields are required");
    }
  
    const cart = await CartModel.findOne({ userId });
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new apiError(404, "Product not found");
    }
  
    const { name, image } = product;
  
    if (!cart) {
      // Create a new cart if it doesn't exist
      const newCart = await CartModel.create({
        userId,
        items: [{
          sellerId,
          sellerName: product.sellerName, // Get seller's name from the product
          items: [{ productId, quantity, unitPrice, price: quantity * unitPrice, name, image }],
          totalItems: quantity,
          totalPrice: quantity * unitPrice,
        }],
        totalItems: quantity,
        totalPrice: quantity * unitPrice,
      });
      return res.status(200).json(new apiResponse(200, "Product added to cart", newCart));
    }
  
    // Find if the seller already exists in the cart
    const sellerGroup = cart.items.find(item => item.sellerId.toString() === sellerId.toString());
  
    if (sellerGroup) {
      // If the seller exists, update the product list for that seller
      const existingProduct = sellerGroup.items.find(item => item.productId.toString() === productId.toString());
  
      if (existingProduct) {
        existingProduct.quantity += quantity;  // Update quantity if the product already exists
        existingProduct.price = existingProduct.quantity * existingProduct.unitPrice;
      } else {
        sellerGroup.items.push({ productId, quantity, unitPrice, price: quantity * unitPrice, name, image });
      }
  
      // Update totalItems and totalPrice for this seller
      sellerGroup.totalItems = sellerGroup.items.reduce((acc, item) => acc + item.quantity, 0);
      sellerGroup.totalPrice = sellerGroup.items.reduce((acc, item) => acc + item.price, 0);
  
      // Recalculate the total for the entire cart
      cart.totalItems = cart.items.reduce((acc, seller) => acc + seller.totalItems, 0);
      cart.totalPrice = cart.items.reduce((acc, seller) => acc + seller.totalPrice, 0);
      await cart.save();
    } else {
      // If the seller doesn't exist, create a new seller group
      cart.items.push({
        sellerId,
        sellerName: product.sellerName,
        items: [{ productId, quantity, unitPrice, price: quantity * unitPrice, name, image }],
        totalItems: quantity,
        totalPrice: quantity * unitPrice,
      });
  
      // Recalculate the total for the entire cart
      cart.totalItems = cart.items.reduce((acc, seller) => acc + seller.totalItems, 0);
      cart.totalPrice = cart.items.reduce((acc, seller) => acc + seller.totalPrice, 0);
      await cart.save();
    }
  
    const updatedCart = await CartModel.findOne({ userId });
    res.status(200).json(new apiResponse(200, "Product added to cart", updatedCart));
  });
  


export {addItemToCart}