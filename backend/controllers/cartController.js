import Cart from "../models/cart.js";

export const updateQuantity = async (userId, productId, size, quantity) => {
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId === productId && item.size === size
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await Cart.findOneAndUpdate({ userId }, cart);
      return Promise.resolve(cart);
    } else {
      throw new Error("Item not found in cart");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};