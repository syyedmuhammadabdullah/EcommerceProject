import { apiError,apiResponse,asyncHandler,CartModel,CartItemModel } from "../../index.js";



const removeItemFromCart = asyncHandler(async (req, res) => {
    const { userId, productId } = req.body;
  
    if (!userId || !productId) {
      throw new apiError(400, "userId and productId are required");
    }
  
    const cart = await CartModel.findOne({ userId });
    if (!cart) throw new apiError(404, "Cart not found");
  
    if (!Array.isArray(cart.items)) {
      throw new apiError(400, "Cart structure is invalid");
    }
  
    let itemRemoved = false;
  
    cart.items = cart.items
      .map(group => {
        const originalLength = group.items.length;
  
        group.items = group.items.filter(
          item => item.productId.toString() !== productId
        );
        console.log(group.items, productId);
        
        if (group.items.length !== originalLength) {
          itemRemoved = true;
        }
  
        group.totalItems = group.items.length;
        group.totalPrice = group.items.reduce((sum, item) => sum + item.price, 0);
  
        return group;
      })
      .filter(group => group.items.length > 0);
  
    if (!itemRemoved) {
      throw new apiError(404, "Product not found in cart");
    }
  
    await cart.save();
  
    res.status(200).json(new apiResponse(200, "Item removed from cart", cart));
  });
  
  
export {removeItemFromCart}